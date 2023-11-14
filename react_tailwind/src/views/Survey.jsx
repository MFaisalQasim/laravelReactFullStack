import { useEffect, useState } from "react";
import axiosClient from "../axios-client";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import PageComponent from "../components/PageComponent";
import SurveyListItem from "../components/SurveyListItem";
import TButton from "../components/core/TButton";

export default function Survey() {

  const [survey, setSurvey] = useState([]);

  const onDeleteClick = () => {

    console.log('Are Sure Want to Delete User?');
    // if (!window.confirm('Are Sure Want to Delete User?')) {
    //   return
    // }
    // axiosClient.delete(`/users/${u.id}`)
    // .then(() => {
    //   setNotification("User Deleted Sucessfully");
    //   getUser();
    // })
  }

useEffect(() => {
  axiosClient.get('/survey')
  .then(({data})=> {
    setSurvey(data.data);
  })
}, [])

  return (
    <>
    <PageComponent title="Survey" button={ (
      <TButton color="green" to="/survey/create" >
        <PlusCircleIcon className="h-6 w-6 mr-2" />
        Create
      </TButton>
    ) } >
      <h1>Survey Childerns</h1>
      <div className="grid grid-cols-1 gap-5 sm:grid-col-2 md:grid-cols-3">
        {survey.map((survey)=>(
          <SurveyListItem survey={survey} key={survey.id}
           onDeleteClick={onDeleteClick}
          />
        ))}
      </div>
    </PageComponent>
    </>
  )
}