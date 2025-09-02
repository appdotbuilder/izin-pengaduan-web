<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreComplaintRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return auth()->check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'permit_type' => 'required|string|max:255',
            'description' => 'required|string|max:2000',
            'incident_date' => 'required|date|before_or_equal:today',
            'location' => 'required|string|max:500',
            'attachment' => 'nullable|file|mimes:pdf,doc,docx,jpg,jpeg,png|max:5120', // 5MB max
        ];
    }

    /**
     * Get custom error messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'permit_type.required' => 'Jenis izin harus diisi.',
            'description.required' => 'Deskripsi masalah harus diisi.',
            'description.max' => 'Deskripsi masalah tidak boleh lebih dari 2000 karakter.',
            'incident_date.required' => 'Tanggal kejadian harus diisi.',
            'incident_date.date' => 'Tanggal kejadian harus berupa tanggal yang valid.',
            'incident_date.before_or_equal' => 'Tanggal kejadian tidak boleh lebih dari hari ini.',
            'location.required' => 'Lokasi harus diisi.',
            'location.max' => 'Lokasi tidak boleh lebih dari 500 karakter.',
            'attachment.file' => 'Lampiran harus berupa file.',
            'attachment.mimes' => 'Lampiran harus berupa file PDF, DOC, DOCX, JPG, JPEG, atau PNG.',
            'attachment.max' => 'Lampiran tidak boleh lebih dari 5MB.',
        ];
    }
}