<?php

namespace App\Http\Services;

use App\Http\Requests\ContragentStoreRequest;
use App\Models\Contragent;
use App\Models\Mail;
use App\Models\Phone;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Foundation\Http\FormRequest;

class ContragentService
{
    public function deleteContragent(Contragent $contragent) {
        return $contragent->delete();
    }
    public function updateContragent(Contragent $contragent, ContragentStoreRequest $request) {
        $contragent->update($request->only('name', 'surname'));
        return $contragent;
    }

    public function addRelation(FormRequest $request, Contragent $contragent) {
        if($request->has('email')) {
            $email = new Mail([ 'email' => $request->email]);
            $email->contragent()->associate($contragent);
            $email->save();
            return $email;
        }
        if($request->has('phone')) {
            $phone = new Phone([ 'phone' => $request->phone]);
            $phone->contragent()->associate($contragent);
            $phone->save();
            return $phone;
        }
        return null;
    }

    public function destroyRelation(FormRequest $request) {
        if($request->has('email')) {
            $email = Mail::find($request->email);
            $email->delete();
        }
        if($request->has('phone')) {
            $phone = Phone::find($request->phone);
            $phone->delete();
        }
        return true;
    }

    public function getContragents(?array $fields, ?string $search) {
        $query = Contragent::with('phones', 'emails');
        if(!($fields && $search)) {
            return $query->get();
        } else {
            $first = true;
            collect($fields)
                ->each(function ($field) use ($search, &$query, &$first) {
                    if($first) {
                        $query = $this->searchFirst($field, $search, $query);
                        $first = false;
                    } else {
                        $query = $this->search($field, $search, $query);
                    }
                });
            return $query->get();
        }
    }

    public function saveContragent(ContragentStoreRequest $request) {
        $contragent = new Contragent($request->only('name', 'surname'));
        $contragent->save();
        $this->attachEmail($contragent, $request);
        $this->attachPhone($contragent, $request);
        return $contragent->load('phones', 'emails');
    }

    private function search(string $field, string $search, Builder $query) {
        if ($field === 'phone' || $field === 'email') {
            return $query->orWhereHas($field.'s', function (Builder $q) use ($search, $field) {
                return $q->where($field, 'like', "%$search%");
            });
        } else {
            return $query->orWhere($field, 'like', "%$search%");
        }
    }

    private function searchFirst(string $field, string $search, Builder $query) {
        if ($field === 'phone' || $field === 'email') {
            return $query->whereHas($field.'s', function (Builder $q) use ($search, $field) {
                return $q->where($field, 'like', "%$search%");
            });
        } else {
            return $query->where($field, 'like', "%$search%");
        }
    }

    private function attachEmail(Contragent $contragent, FormRequest $request) {
        $this->attach('emails', $request, function ($obj) use ($contragent) {
            $email = new Mail($obj);
            $email->contragent()->associate($contragent);
            $email->save();
        });
    }

    private function attachPhone(Contragent $contragent, FormRequest $request) {
        $this->attach('phones', $request, function ($obj) use ($contragent) {
            $phone = new Phone($obj);
            $phone->contragent()->associate($contragent);
            $phone->save();
        });
    }

    private function attach(string $field, FormRequest $request, \Closure $cb) {
        if($request->has($field)) {
            collect($request->input($field))
                ->each(function ($obj) use ($cb) {
                    $cb($obj);
                });
        }
    }
}