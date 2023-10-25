<?php

namespace App\Enum;

enum QuestionTypeEnum: string
{
    case TYPE_TEXT = 'text';
    case TYPE_TEXTAREA = 'textarea';
    case TYPE_SELECT = 'select';
    case TYPE_Radio = 'radio';
    case TYPE_CHECKBOX = 'checkbox';
}