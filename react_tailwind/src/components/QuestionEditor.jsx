import { useState, useEffect } from "react";
import { useStateContext } from "../contexts/ContextProvider";
import { PlusIcon, TrashIcon } from "@heroicons/react/24/outline";

export default function QuestionEditor({
  index = 0,
  question,
  addQuestion,
  changeQuestion,
  deleteQuestion
}) {

    const [surveyQuestion, setSurveyQuestion] = useState({...question });
    const {questionTypes} = useStateContext();

    useEffect(() => {
      changeQuestion(surveyQuestion);
    }, [surveyQuestion]);

    function upperCaseFirst(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }

  return (
    <>
    <div className="p-5 mb-3">
      <div className="flex justify-between">
        <h4 className="text-2xl font-bold" >{index + 1}.{surveyQuestion.question}</h4>
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
              // onChange={onTypeChange}
              className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
              {questionTypes.map((type) => (
                <option value={type} key={type}>
                  {upperCaseFirst(type)}
                </option>
              ))}
            </select>
          </div>
      </div>
      <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <textarea name="description" id="description" cols="30" rows="10"
            value={surveyQuestion.description}
            onChange={(e) => setSurveyQuestion({...surveyQuestion, description: e.target.value })}
            className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
          ></textarea>
      </div>
    </div>
    {JSON.stringify(surveyQuestion)} 
    </>
  )
}