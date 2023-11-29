import { TrashIcon } from "@heroicons/react/24/outline";
import PageComponent from "../components/PageComponent";
import { useEffect, useState } from "react";
import axiosClient from "../axios-client";
import { useParams } from "react-router-dom";

export default function SurveySubmitView() {

    const [survey, setSurvey] = useState({})
    const slug = useParams({})

    useEffect(() => {
        axiosClient.get(`/survey/get-by-slug/${slug.slug}`)
        .then(({response}) => {
            console.log(response.data)
            setSurvey(response.data)
            console.log(survey)
        })
        .catch(error => {
            console.log(error)
        })
    }, [])

  return (
    <PageComponent 
    // title={!id? 'Create new Survey' : 'Update Survey'}
    title={'Survey Submit'}
    button={
    <div className="flex justify-between">
      {/* <button type="button"
          href={`survey/public/${survey.slug}`}
          className="flex items-center text-sm py-1 px-4 rounded-sm text-white bg-gray-600 hover:bg-gray-700  mr-2">
          <LinkIcon className="w-4" />
          Public Survey View
      </button>
      <button type="button"
          onClick={() => deleteSurvey(survey)}
          className="flex items-center text-sm py-1 px-4 rounded-sm text-red border border-red-300  hover:border-red-700">
          <TrashIcon className="w-4 mr-2" />
          Delete
      </button> */}
    </div>
    }
    >
        <div>SurveySubmitView</div>
        <h4>Question</h4>
        {survey.questions &&
            survey.map((s) => {
                <>
                <div>
                    
                    {s.questions}   
                </div>
                </>
            })
        }
    </PageComponent>
  )
}
