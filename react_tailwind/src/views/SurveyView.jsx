import { useState } from "react"
import PageComponent from "../components/PageComponent";
import {PhotoIcon } from "@heroicons/react/24/outline";
import TButton from "../components/core/TButton";
import axiosClient from "../axios-client";
import SurveyQuestions from "../components/SurveyQuestions";

export default function SurveyView() {

    const [survey, setSurvey] = useState({
        title : '',
        slug : '',
        status : false,
        description : "",
        image : null,
        image_url : null,
        expire_date : '',
        questions : [],
    });
    
    // const [error, setError] = useState({});
    const [error, setError] = useState({__html: ""});
    const [expireDate,setExpireDate] = useState({__html: ""});    

    const onImageChose = (e) => {

      const file = e.target.files[0]
      const reader = new FileReader();
      reader.onload = () => {
        setSurvey({
          ...survey,
          image: file,
          image_url: reader.result,
        });
        e.target.value = "";
      };
      reader.readAsDataURL(file);
    }

    const onSubmit = (e) => {
      e.preventDefault();

      const payload = { ...survey };
      if (payload.image) {
        payload.image = payload.image_url
      }
      delete payload.image_url;
      axiosClient.post('/survey',payload)
      .then((res) => {
        setError({__html: ""})
        setExpireDate({__html: ""})
        console.log(res);
      })
      .catch(error => {     
        setError({__html: ""})
        setExpireDate({__html: ""})   
        var eachError = [];
        var expireDate = '';
        const response = error.response;
        if (response && error.response.status === 422) {
          eachError = Object.values(response.data.errors).reduce((accum, next) => [...accum, ...next],[])
          expireDate = eachError[1];
          setError({__html: eachError.join('<br>')})
          setExpireDate({__html: expireDate})
          console.log(response);
        }
        else{
          setError({__html: response.data.message})
          setExpireDate({__html: expireDate})
          console.log(response);
        }
    })
    }

    function onQuestionUpdate(questions) {
      setSurvey({
        ...survey,
        questions})
    }

  return (
    <PageComponent
    // button={
    //   <TButton color="green" href={`/survey/public/${survey.slug}`} >
    //     <LinkIcon className="h-4 w-4 mr-2" />
    //     Public Link
    //   </TButton>
    // }
    >
    <form  action="#" method="Post" onSubmit={onSubmit} >
      <div className="shadow sm:overflow-hidden sm:rounded-md">
        <div className="space-y-6 bg-white px-4 py sm:p-6">
          {/* {error && (
            (error).forEach(err => {
                  <div className="bg-red-500 text-white py-3 px-3">{err}</div>
            })
            )
          } */}

          {/* {error.__html != "" ? error.__html && (<div className="bg-red-500 rounded py-2 px-3 text-white" dangerouslySetInnerHTML={error} ></div>) : 'here'} */}
          {error.__html && (<div className="bg-red-500 rounded py-2 px-3 text-white" dangerouslySetInnerHTML={error} ></div>)}

          {/*Image*/}
          <div>
            <label htmlFor="" className="block text-sm-font-medium text-gray-700">
              Photo
            </label>
            <div className="mt-1 flex items-center">
              {survey.image_url && (
                <img
                  src={survey.image_url}
                  alt={survey.title}
                  className="w-32 h-32 object-cover"
                />
              )}
              {!survey.image_url && (
                <span className="flex justify-center items-center text-gray-400 h-12 w-12 overflow-hidden rounded-full rounded-full bg-gray-100">
                  <PhotoIcon className='w-8 h-8' />
                </span>
              )}
              <button
               type="button"
               className="relative ml-5 rounded-md border border-gray-300 bg-white py-2 px-3 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
              <input type="file" className="absolute left-0 top-0 right-0 bottom-0 opacity-0" onChange={onImageChose} />
                Change
              </button>
            </div>
          </div>
          {/*Image*/}

          {/*Title*/}
          <div className="col-soan-6 sm:col-span-3">
            <label htmlFor="" className="block text-sm font-medium text-gray-700">
              Survey Title
            </label>
            <input type="text" 
            name="title"
            id="title"
            value={survey.title}
            onChange={(e) => 
              setSurvey({...survey, title: e.target.value})
            }
            placeholder="Survey Title"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
          </div>
          
              {/*Description*/}
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700"
                >
                  Description
                </label>
                <textarea
                  name="description"
                  id="description"
                  value={survey.description || ""}
                  onChange={(ev) =>
                    setSurvey({ ...survey, description: ev.target.value })
                  }
                  placeholder="Describe your survey"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                ></textarea>
              </div>
              {/*Description*/}

          {/*Expire Date*/}

          <div className="col-span-6 sm:col-span-3">
            <label htmlFor="" className="block text-sm font-medium text-gray-">
              Expire Date 
            </label>
            <input type="date"
             name="expire_date"
             id="expire_date"
             value={survey.expire_date}
             onChange={(e) => 
              setSurvey({
                ...survey, expire_date: e.target.value
              })
            }
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm-text-sm" />
          </div>
          {expireDate.__html && (<div className="bg-red-500 rounded py-2 px-3 text-white" dangerouslySetInnerHTML={expireDate} ></div>)}

          {/*Active*/}
          <div className="flex items-start">
            <div className="flex h-5 items-center">
              <input 
               type="checkbox"
               name="status"
               id="status"
               checked={survey.status}
               onChange={(e) => 
               setSurvey({
                ...survey, status: e.target.checked
               })
              }
               className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
            </div>
            <div className="ml-3 text-sm">
                <lable className="font-medium text-gray-700">
                  Active
                </lable>
                <p className="text-gray-500">
                  Whether to make survey publicly available
                </p>
            </div>           
          </div>
          {/* <button type="button" onClick={addQuestion} >
            Add question
          </button> */}
        </div>
        <SurveyQuestions
          questions={survey.questions}
          onQuestionUpdate={onQuestionUpdate}
        />
        <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
          <TButton>Save</TButton>
        </div>
      </div>
    </form>
    </PageComponent>
  )
}