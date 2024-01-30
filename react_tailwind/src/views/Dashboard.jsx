import { useEffect, useState } from "react";
import DashboardCard from "../components/DashboardCard";
import PageComponent from "../components/PageComponent";
import axiosClient from "../axios-client";
import TButton from "../components/core/TButton";
import { EyeIcon, PencilIcon } from "@heroicons/react/24/outline";


export default function Dashboard() {

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});

  useEffect(() => {
    axiosClient.get('/dashboard')
    .then((response) =>{
      setLoading(true);
      setData(response.data);
      console.log(response.data);
      return response;
    })
    .catch((error) =>{
      setLoading(true);
      return error;
    })
  }, [])
  
  return (
    <PageComponent title="Dashboard" >
      {!loading && 
      <div className="flex justify-content-center">Loading..</div>
      }
      {loading && 
      <div className="grid grid-cols-1 md:grid-col-2 lg:grid-col-3 gap-5 text-gray-700">
      <DashboardCard title="Totol Survey" 
      className='order-1 lg:order-2'
      style={{ animationDelay : '0.1s' }} >
        <div className="text-8xl pb-4 font-semibold flex-1 flex items-center justify-center">
          {data.totalSurvey}
        </div>
      </DashboardCard>
      <DashboardCard title="Latest Survey" 
      className='order-2 lg:order-4'
      style={{ animationDelay : '0.2s' }} >
        <div className="text-8xl pb-4 font-semibold flex-1 flex items-center justify-center">
          {data.latestSurvey && (
              <div>
                <img
                  src={data.latestSurvey.image_url}
                  className="w-[240px] mx-auto"
                />
                <h3 className="font-bold text-xl mb-3">
                  {data.latestSurvey.title}
                </h3>
                <div className="flex justify-between text-sm mb-1">
                  <div>Create Date:</div>
                  <div>{data.latestSurvey.created_at}</div>
                </div>
                <div className="flex justify-between text-sm mb-1">
                  <div>Expire Date:</div>
                  <div>{data.latestSurvey.expire_date}</div>
                </div>
                <div className="flex justify-between text-sm mb-1">
                  <div>Status:</div>
                  <div>{data.latestSurvey.status ? "Active" : "Draft"}</div>
                </div>
                <div className="flex justify-between text-sm mb-1">
                  <div>Questions:</div>
                  <div>{data.latestSurvey.questions}</div>
                </div>
                <div className="flex justify-between text-sm mb-3">
                  <div>Answers:</div>
                  <div>{data.latestSurvey.answers}</div>
                </div>
                <div className="flex justify-between">
                  <TButton to={`/surveys/${data.latestSurvey.id}`} link>
                    <PencilIcon className="w-5 h-5 mr-2" />
                    Edit Survey
                  </TButton>

                  <TButton link>
                    <EyeIcon className="w-5 h-5 mr-2" />
                    View Answers
                  </TButton>
                </div>
              </div>
          )}
        </div>
          {!data.latestSurvey && (
            <div className="text-gray-600 text-center py-16">
              You have no survey yet
            </div>
          )}
      </DashboardCard>
      <DashboardCard title="Totol Answers" 
      className='order-3 lg:order-1 row-span-2'
      style={{ animationDelay : '0.2s' }} >
        <div className="text-8xl pb-4 font-semibold flex-1 flex items-center justify-center">
          {data.totalAnswers}
        </div>
      </DashboardCard>
      <DashboardCard title="Latest Answer" 
      className='order-4 lg:order-3 row-span-2'
      style={{ animationDelay : '0.3s' }} >
          {data.latestAnswers.length && (
            <div className="text-left">
              {data.latestAnswers.map((ans)=> (
                <a href="#"
                key={ans.id}
                className="block p-2 hover:bg-gray-100/90"
                >
                  <div className="font-semibold" >{ans.survey.title}</div>
                  <small>
                    Answered At :
                    <i className="font-semibold">{ans.end_date}</i>
                  </small>
                </a>
              ))}
            </div>
          )}
          {!data.latestAnswers.length && (
            <div className="text-gray-600 text-center py-16">
              You have no answer yet
            </div>
          )}
      </DashboardCard>
      </div>}
    </PageComponent>
  )
}