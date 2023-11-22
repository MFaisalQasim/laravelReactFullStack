import { useEffect, useState } from "react";
import axiosClient from "../axios-client";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import PageComponent from "../components/PageComponent";
import SurveyListItem from "../components/SurveyListItem";
import TButton from "../components/core/TButton";
import PaginationLinks from "../components/PaginationLinks";
import { useStateContext } from "../contexts/ContextProvider";

export default function Survey() {

  const [survey, setSurvey] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(true);
  const { showToast } = useStateContext();

  const onDeleteClick = (id) => {
    if (!window.confirm('Are Sure Want to Delete Survey?')) {
      return
    }
    axiosClient.delete(`/survey/${id}`)
    .then(() => {
      axiosClient.get('survey')
      getSelectedSurveys(getSelectedSurveys.url);
      showToast('Survey is deleted');
    })
  }
  function getSelectedSurveys(link){
    let url;
    url = link || '/survey';
    axiosClient.get(url)
    .then(({data})=> {
      setSurvey(data.data);
      setPagination(data.meta);
      setLoading(false);
    })
  }
  useEffect(() => {
    setLoading(true);
    getSelectedSurveys(getSelectedSurveys.url)
  }, [])

  return (
    <>
    <PageComponent title="Survey" button={(
      <TButton color="green" to="/survey/create" >
        <PlusCircleIcon className="h-6 w-6 mr-2" />
        Create
      </TButton>
    ) } >
      {loading && (
      <div className='text-center text-lg' >Loading...</div>
      )}
      {!loading && (
      <div>
        <div className="grid grid-cols-1 gap-5 sm:grid-col-2 md:grid-cols-3">
          {survey.length <= 0 &&
            <div>You don`t have any survey created</div>
          }
          {survey.map((survey)=>(
            <SurveyListItem survey={survey} key={survey.id}
            onDelete={onDeleteClick}
            />
            ))
          }
        </div>
        {survey.length > 0 &&
          <PaginationLinks meta={pagination} onChangePagitaion={getSelectedSurveys} />
        }
      </div>
      )}
    </PageComponent>
    </>
  )
}