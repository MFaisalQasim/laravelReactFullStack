// import { TrashIcon } from "@heroicons/react/24/outline";
import PageComponent from "../components/PageComponent";
import SubmitQuestionView from "../components/SubmitQuestionView";
import { useEffect, useState } from "react";
import axiosClient from "../axios-client";
import { useParams } from "react-router-dom";

export default function SurveySubmitView() {

    const answers = {};
    const [survey, setSurvey] = useState(
        {
            questions: [],
        }
    )
    const [loading, setLoading] = useState(false)
    const { slug } = useParams({})

   function answerMark(question, value) {
    answers[question.id] = value
    console.log(question, value);
    }

    useEffect(() => {
        axiosClient.get(`/survey/get-by-slug/${slug}`)
            .then(({ data }) => {
                setLoading(true)
                setSurvey(data.data)
            })
            .catch(error => {
                setLoading(true)
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
            {!loading
                &&
                <div className="d-flex align-center text-center text-lg">Loading..</div>
            }
            {loading &&
                <form
                    // onSubmit={(ev) => onSubmit(ev)}
                    className="container mx-auto p-4">
                    <div className="grid grid-cols-6">
                      <div className="mr-4">
                        <img src={survey.image_url} alt="" />
                      </div>
                      <div className="col-span-5">
                        <h1 className="text-3xl mb-3">{survey.title}</h1>
                        <p className="text-gray-500 text-sm mb-3">
                          Expire Date: {survey.expire_date}
                        </p>
                        <p className="text-gray-500 text-sm mb-3">{survey.description}</p>
                      </div>
                    </div>
                    {survey.questions.map((question, index) => (
                        <SubmitQuestionView 
                        key={question.id}
                        index={index}
                        question={question}
                        answerMark={(val)=> answerMark(question, val)}
                        />
                    ))}
                </form>
            }
        </PageComponent>
    )
}