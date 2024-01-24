export default function SubmitQuestionView({
    index,
    key,
    question,
    answerMark
}) {
  return (
    <fieldset className="mb-4">
        <div>
        <legend className="text-base font-medium text-gray-900">
            {index + 1}. {question.question}
        </legend>
        <p className="text-gray-500 text-sm">{question.description}</p>
        </div>
        <div>
            {question.type === 'text' &&(
                <div>
                    <select onChange={(ev) => answerMark(ev.target.value)}
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    ></select>
                    <option value="">Please Select</option>
                    {question.data.options.map((option) => (
                    <option key={option.uuid} value={option.text}>{option.text}</option>
                    ))}
                </div>
                )
            }
            {question.type === 'select' &&(
                <div>
                    <select onChange={(ev) => answerMark(ev.target.value)}
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    ></select>
                    <option value="">Please Select</option>
                    {question.data.options.map((option) => (
                    <option key={option.uuid} value={option.text}>{option.text}</option>
                    ))}
                </div>
                )
            }
            {question.type === 'radio' &&(
                <div>
                    <select onChange={(ev) => answerMark(ev.target.value)}
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    ></select>
                    <option value="">Please Select</option>
                    {question.data.options.map((option) => (
                    <option key={option.uuid} value={option.text}>{option.text}</option>
                    ))}
                </div>
                )
            }
            {question.type === 'checkbox' &&(
                <div>
                    <select onChange={(ev) => answerMark(ev.target.value)}
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    ></select>
                    <option value="">Please Select</option>
                    {question.data.options.map((option) => (
                    <option key={option.uuid} value={option.text}>{option.text}</option>
                    ))}
                </div>
                )
            }
            {question.type === 'textarea' &&(
                <div>
                    <select onChange={(ev) => answerMark(ev.target.value)}
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    ></select>
                    <option value="">Please Select</option>
                    {question.data.options.map((option) => (
                    <option key={option.uuid} value={option.text}>{option.text}</option>
                    ))}
                </div>
                )
            }
        </div>
    </fieldset>
  )
}