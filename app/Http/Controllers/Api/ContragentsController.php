<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ContragentStoreRequest;
use App\Http\Requests\RelationRequest;
use App\Http\Requests\SearchRequest;
use App\Http\Services\ContragentService;
use App\Models\Contragent;
use Illuminate\Http\Request;

class ContragentsController extends Controller
{
    public function index(SearchRequest $request, ContragentService $contragentService)
    {
        return $contragentService->getContragents(
            $request->input('fields', null),
            $request->input('search', null)
        );
    }

    public function store(ContragentStoreRequest $request, ContragentService $contragentService) {
        return $contragentService->saveContragent($request);
    }

    public function update(
        ContragentStoreRequest $request,
        Contragent $contragent,
        ContragentService $contragentService
    ) {
        return $contragentService->updateContragent($contragent, $request);
    }

    public function addRelationObject(
        RelationRequest $request,
        Contragent $contragent,
        ContragentService $contragentService
    ) {
        return $contragentService->addRelation($request, $contragent);
    }

    public function destroyRelationObject(
        RelationRequest $request,
        ContragentService $contragentService
    ) {
        return $contragentService->destroyRelation($request);
    }

    public function destroy(Contragent $contragent, ContragentService $contragentService) {
        return $contragentService->deleteContragent($contragent);
    }
}