<?php

namespace App\Http\Controllers;

use App\Http\Resources\DashboardSurveyResource;
use App\Http\Resources\SurveyAnswerResource;
use App\Models\Survey;
use App\Models\SurveyAnswer;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index(Request $request) {

        $user = $request->user();
        $total = Survey::query()->where('user_id', $user->id)->count();

        $latest = Survey::query()->where('user_id', $user->id)->latest('created_at')->first();

        $answers = SurveyAnswer::query()
        ->join('surveys', 'survey_answers.survey_id', '=', 'surveys.id')
        ->where('user_id', $user->id)->count();

        $latestAnswers = SurveyAnswer::query()
        ->join('surveys', 'survey_answers.survey_id', '=', 'surveys.id')
        ->where('user_id', $user->id)->getModels('survey_answers.*');

        return [
            'totalSurvey' => $total,
            'latestSurvey' => $latest ? new DashboardSurveyResource($latest) : null,
            'totalAnswers' => $answers,
            'latestAnswers' => SurveyAnswerResource::collection($latestAnswers)
        ];
    }
}