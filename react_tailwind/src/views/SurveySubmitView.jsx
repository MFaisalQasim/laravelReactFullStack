import { TrashIcon } from "@heroicons/react/24/outline";
import PageComponent from "../components/PageComponent";
import { useEffect, useState } from "react";
import axiosClient from "../axios-client";
import { useParams } from "react-router-dom";

export default function SurveySubmitView() {

    // questions: [],
    const [survey1, setSurvey1] = useState({
        questions: [],
    })
    const {slug} = useParams({})

    useEffect(() => {
        axiosClient.get(`/survey/get-by-slug/${slug}`)
        .then(({data}) => {
            console.log(data.data)
            console.log(data.data.questions)
            setSurvey1(data.data)
            console.log(survey1)
        })
        .catch(error => {
            console.log(error)
        })
    }, [])

  return (
    <PageComponent 
    // title={!id? 'Create new Survey1' : 'Update Survey1'}
    title={'Survey1 Submit'}
    button={
    <div className="flex justify-between">
      {/* <button type="button"
          href={`survey1/public/${survey1.slug}`}
          className="flex items-center text-sm py-1 px-4 rounded-sm text-white bg-gray-600 hover:bg-gray-700  mr-2">
          <LinkIcon className="w-4" />
          Public Survey1 View
      </button>
      <button type="button"
          onClick={() => deleteSurvey1(survey1)}
          className="flex items-center text-sm py-1 px-4 rounded-sm text-red border border-red-300  hover:border-red-700">
          <TrashIcon className="w-4 mr-2" />
          Delete
      </button> */}
    </div>
    }
    >
        <div>Survey1SubmitView</div>
        <h4>Question{survey1.questions.id}</h4>

        {
        survey1.questions &&
            survey1.questions.map((s) => {
                <div>
                    {s}
                    {s.id}
                </div>
            })
        }
    </PageComponent>
  )
}
