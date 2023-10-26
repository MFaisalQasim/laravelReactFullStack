<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;

class Survey extends Model
{
    use HasFactory;
    use HasSlug;

    protected $fillable = [
        'user_id' ,
        'title' ,
        'image' ,
        'describtion' ,
        'status' ,
        'expire_date' ];
    
        /**
         * Get the options for generating the slug.
         */
        public function getSlugOptions() : SlugOptions
        {
            return SlugOptions::create()
                ->generateSlugsFrom('title')
                ->saveSlugsTo('slug');
        }
}
