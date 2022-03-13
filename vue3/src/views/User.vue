<template>
    <div>
        <h3>User</h3>

        <div v-if="isShowForm">
            <form @submit.prevent="onSubmit"
                id="form">
                <input type="text" placeholder="name" v-model="form.name" name="name">
                <input type="text" placeholder="email" v-model="form.email" name="email">
                <input type="password" placeholder="password" v-model="form.password" name="password">
                <input type="file" name="photo">
                <button>
                    <span v-if="isLoadingForm">
                        ...
                    </span>
                    <span v-else> 
                        Submit
                    </span>
                </button>
            </form>
        </div>

        <button @click="onAdd">Add</button>

        <br/>
        <input type="text" v-model="queryString.search" >
        <button @click="onSearch">Search</button>
        <br/>
        <table>
            <tr>
                <td>name</td> 
                <td>email</td>
                <td>photo</td> 
                <td>opsi</td>
            </tr> 
            <tr v-for="item in items.data"
                :key="item.id">
                <td>{{item.name}}</td>
                <td>{{item.email}}</td>
                <td>
                    <img :src="'http://localhost:8000/images/users/'+item.photo" style="width:10px"/>                    
                </td> 
                <td>
                    <button @click="onDelete(item.id)">Hapus</button>
                    <button @click="onEdit(item)">Update</button>
                </td>
            </tr>
        </table>
        
        <button @click="onPrev()">Sebelumnya</button>
        <button @click="onNext()">Next</button>
    </div>
</template>

<script>
import { ref, onBeforeMount,inject } from 'vue'

export default {
    setup(){
        const $axios = inject('axios');
        const $toast = inject('toast');
        
        const form = ref({
            id : 0,
            name : '',
            email : '',
            password : '',
            photo : ''
        })

        const isLoadingForm = ref(false);
        const isEditable = ref(false);
        const isShowForm = ref(false);

        const queryString = ref({
            per_page : 10,
            search : '',
            page : 1
        });

        const items = ref({
            data : []
        })

        const onLoad = () => {
            let queryStr = "search="+queryString.value.search
                +"&page="+queryString.value.page 
                +"&per_page="+queryString.value.per_page;

            $axios.get("/user?"+queryStr)
            .then(res => {
                items.value = res.data;            
            })
        }

        const onNext = () => {
            queryString.value.page += 1;
            onLoad()
        }

        const onPrev = () => {
            queryString.value.page -= 1;
            onLoad()
        }

        const onEdit = (item) => {
            isEditable.value = true;
            isShowForm.value = true;
            form.value = {...item}
        }
        
        const onDelete = (id) => {
            $axios.delete("/user/"+id)
            .then(() =>{
                onLoad();
            })
        }

        const onAdd = () => {
            isEditable.value = false;
            isShowForm.value = true;
        }

        const onSearch = () => {
            onLoad();
        }

        const onSubmit = () => {
            if(isLoadingForm.value) return 

            isLoadingForm.value = true;

            if(isEditable.value){
                let formData = new FormData(document.getElementById("form"));
                formData.append("_method","put");

                $axios.post("/user/"+form.value.id,formData)
                .then(() => {
                    $toast.success("Berhasil")
                    onLoad();
                })
                .finally(() => {
                    isLoadingForm.value = false;
                })
            }else{
                let formData = new FormData(document.getElementById("form"));

                $axios.post("/user",formData)
                .then(() => {
                    $toast.success("Berhasil")
                    onLoad();
                })
                .finally(() => {
                    isLoadingForm.value = false;
                })
            }
        }
 

        onBeforeMount(() => {
            onLoad()
        });


        return {
            items,
            onNext,
            onPrev,
            queryString,
            onSearch,
            onDelete,

            isShowForm,
            isEditable,
            isLoadingForm,

            onSubmit,
            form,

            onAdd,
            onEdit
        }
    }
}
</script>
