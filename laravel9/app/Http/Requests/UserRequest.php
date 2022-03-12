<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class UserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        $rules =  [
            "name" => "string|required|max:20",
            "email" => "string|required|email|max:50|unique:users,email",
            "password" => "string|required",
            "photo" => "nullable|image|mimes:jpeg,png,jpg|max:5025|dimensions:max_width=10000,max_height=10000"
        ];

        if($this->method() == "PUT" || $this->method() == "put"){
            $rules["email"] = $rules["email"].",".$this->user->id;
            $rules["password"] = "nullable|string";
        }

        return $rules;
    }

    public function failedValidation(Validator $validator){
        throw new HttpResponseException(
            response()->json([
                "message" => $validator->errors()->first()
            ],422)
        );
    }
}
