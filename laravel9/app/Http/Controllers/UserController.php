<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Http\Requests\UserRequest;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $data = User::query();
    
        if($request->filled("search")){
            $data->where(function($q) use ($request) {
                $q->orWhere("name","like","%".$request->search."%")
                    ->orWhere("email","like","%".$request->search."%");
            });
        }

        $data = $data->orderBy("id","desc")->paginate(10);

        return response()->json($data);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(UserRequest $request)
    {
        try{
            \DB::beginTransaction();

            $payload = $request->only("name","email");
            $payload["password"] = \Hash::make($request->pasword);

            if($request->hasFile("photo")){
                $filename = rand(10000,9999999).".png";

                \Image::make($request->file("photo"))
                    ->save(public_path("/images/users/".$filename));
                
                $payload["photo"] = $filename;
            }            

            User::create($payload);

            \DB::commit();
            return response()->json([
                "message" => true
            ]);
        }catch(\Exception $e){
            \DB::rollback();
            return response()->json([
                "message" => $e->getMesage()
            ],500);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(User $user)
    {
        return response()->json($user);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(UserRequest $request,User $user)
    {        
        try{
            \DB::beginTransaction();

            $payload = $request->only("name","email");

            if($request->filled("password")){
                $payload["password"] = \Hash::make($request->pasword);
            }

            if($request->hasFile("photo")){
                $filename = rand(10000,9999999).".png";

                \Image::make($request->file("photo"))
                    ->save(public_path("/images/users/".$filename));
                
                $payload["photo"] = $filename;

                if($user->photo != "default.png" && file_exists(public_path('/images/users/'.$user->photo))){
                    unlink(public_path('/images/users/'.$user->photo));
                }    
            }            
    
            $user->update($payload);

            \DB::commit();
            return response()->json([
                "message" => true
            ]);
        }catch(\Exception $e){
            \DB::rollback();
            return response()->json([
                "message" => $e->getMesage()
            ],500);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(User $user)
    {
        try{
            \DB::beginTransaction();

            $user->delete();

            if($user->photo != "default.png" && file_exists(public_path('/images/users/'.$user->photo))){
                unlink(public_path('/images/users/'.$user->photo));
            }    

            \DB::commit();
            return response()->json([
                "message" => true
            ]);
        }catch(\Exception $e){
            \DB::rollback();
            return response()->json([
                "message" => $e->getMesage()
            ],500);
        }
    }
}
