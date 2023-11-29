import { useState, useEffect } from "react";
import { useStateContext } from "../contexts/ContextProvider";
import { PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import { v4 as uuidv4 } from "uuid";

export default function QuestionEditor({
  index = 0,
  question,
  addQuestion,
  changeQuestion,
  deleteQuestion,
}) {

    const [surveyQuestion, setSurveyQuestion] = useState({...question });
    const {questionTypes} = useStateContext();
    const addOptions = () => {
        // ind = ind !== undefined? ind : surveyQuestion.data.length
        console.log(surveyQuestion.data)
        surveyQuestion.data.options.push({
          uuid: uuidv4(), text: ''
        })
        setSurveyQuestion({...surveyQuestion})
    }
    const deleteOptions = (option) => {
      console.log(option);
        const options = surveyQuestion.data.options.filter((q) => q.uuid !== option.uuid);
          const data = {
            options
          }
        setSurveyQuestion({...surveyQuestion,
          data}
        )
        console.log(surveyQuestion)
    }

    useEffect(() => {
      changeQuestion(surveyQuestion);
    }, [surveyQuestion])

    function upperCaseFirst(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }
    function shouldHaveOptions(type =null) {
      type = type || surveyQuestion.type
      return ['select', 'radio', 'checkbox'].includes(type)
    }
    function onTypeChange(e) {
      const newSurvey = {...surveyQuestion, type: e.target.value}
      if(!shouldHaveOptions(surveyQuestion.type) && shouldHaveOptions(e.target.value)){
        if (!newSurvey.data.options) {
          newSurvey.data = {
            options: [
              {uuid: uuidv4(), text: ''}
            ]
          }
        }
      }
      // else if(shouldHaveOptions(surveyQuestion.type) && !shouldHaveOptions(e.target.value)) {
      //   newSurvey.data = {}
      // }
      setSurveyQuestion(newSurvey)
    }

  return (
    <>
    <div className="p-5 mb-3">
      <div className="flex justify-between">
        <h4 className="text-2xl font-bold" >{index + 1}.{surveyQuestion.question}</h4>
        <br />
        <div className="flex justify-between">
          <button type="button"
              onClick={() => addQuestion(index+1)}
              className="flex items-center text-sm py-1 px-4 rounded-sm text-white bg-gray-600 hover:bg-gray-700  mr-2">
              <PlusIcon className="w-4" />
              Add
          </button>
          <button type="button"
              onClick={() => deleteQuestion(question)}
              className="flex items-center text-sm py-1 px-4 rounded-sm text-red border border-red-300  hover:border-red-700">
              <TrashIcon className="w-4 mr-2" />
              Delete
          </button>
        </div>
      </div>
      <div className="flex gap-3 justify-between">
        {/* Question Text */}
        <div className="flex-1">
          <label htmlFor="question"
            className="block text-sm font-medium text-gray-700">Question</label>
          <input type="text"
            name="question" id="question"
            value={surveyQuestion.question}
            onChange={(e)=> setSurveyQuestion({...surveyQuestion, question: e.target.value})}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"/>
        </div>
        {/* Question Type */}
          <div>
            <label htmlFor="questionType" className="block text-sm font-medium text-gray-700">Question Type</label>
            <select name="questionType" id="questionType"
              value={surveyQuestion.type}
              onChange={onTypeChange}
              className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
              {questionTypes.map((type) => (
                <option value={type} key={type}>
                  {upperCaseFirst(type)}
                </option>
              ))}
            </select>
          </div>
      </div>
      {shouldHaveOptions() && 
      <>
        <div className="flex justify-between p-5" >
            <h3 className="text-2xl font-bold">Options</h3>
            <button type="button"
                onClick={() => addOptions()}
                className="flex items-center text-sm py-1 px-4 rounded-sm text-white bg-gray-600 hover:bg-gray-700">
                <PlusIcon className="w-4 mr-2"/>
                Add Options
            </button>
        </div>
        {surveyQuestion.data.options.length > 0 && (
            surveyQuestion.data.options.map((o, ind) => (
              <>
              <div className="flex justify-between">
                <div className="flex justify-between">
                <h4 className="text-2xl font-bold" >{ind + 1}</h4>
                <br />
                </div>
                    <div className="flex justify-between w-full pl-2 pr-2">
                      <input className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm w-full"
                       onInput={(e) => {o.text = e.target.value; setSurveyQuestion({...surveyQuestion}) }}
                       value={o.text}
                       />
                    </div>
                    <div className="flex justify-between">
                       <button type="button"
                          onClick={() => addOptions()}
                          className="flex items-center text-sm py-1 px-4 rounded-sm text-white bg-gray-600 hover:bg-gray-700 mt-1 mr-2">
                          <PlusIcon className="w-4" />
                          Add
                      </button>
                      <button type="button"
                          onClick={() => deleteOptions(o)}
                          className="flex items-center text-sm py-1 px-4 rounded-sm text-red border border-red-300  hover:border-red-700 mt-1">
                          <TrashIcon className="w-4 mr-2" />
                          Delete
                      </button>
                    </div>
              </div>
              </>
            ))
          )
        }
        {surveyQuestion.data.options.length === 0   &&
          (
            <>
              <div className="text-gray-400 text-center py-4">You Have No Options Added</div>
            </>
          )
        }
        </>
      }
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <textarea name="description" id="description" cols="30" rows="10"
            value={surveyQuestion.description}
            onChange={(e) => setSurveyQuestion({...surveyQuestion, description: e.target.value })}
            className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            ></textarea>
        </div>
    </div>
    </> 
  )
}