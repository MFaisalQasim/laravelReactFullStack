export default function SubmitQuestionView({
  index,
  key,
  question,
  answerMark,
}) {

  let selectedOptions = [];

  function onCheckboxChange(option, $event) {
      if ($event.target.checked) {
          selectedOptions.push(option.text);
      } else {
          selectedOptions = selectedOptions.filter(op => op != option.text)
      }
      answerMark(selectedOptions);
  }

  return (
    <fieldset className="mb-4">
      <div>
        <legend className="text-base font-medium text-gray-900">
          {index + 1}. {question.question}
        </legend>
        <p className="text-gray-500 text-sm">{question.description}</p>
      </div>
      <div>
        {question.type === "text" && (
          <div>
            <input
              onChange={(ev) => answerMark(ev.target.value)}
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        )}
        {question.type === "textarea" && (
          <div>
            <textarea
              onChange={(ev) => answerMark(ev.target.value)}
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            ></textarea>
          </div>
        )}
        {question.type === "select" && (
          <div>
            <select
              onChange={(ev) => answerMark(ev.target.value)}
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="">Please Select</option>
              {question.data.options.map((option) => (
                <option key={option.uuid} value={option.text}>
                  {option.text}
                </option>
              ))}
            </select>
          </div>
        )}
        {question.type === "radio" && (
          <div>
            {question.data.options.map((option, ind) => (
              <div key={option.uuid} className="flex items-center">
                <input
                  id={option.uuid}
                  name={"question"+question.id}
                  type="radio"
                  value={option.text}
                  onChange={(ev) => answerMark(ev.target.value)}
                  className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                />
                <label htmlFor={option.uuid} className="ml-3 block text-sm font-medium text-gray-700" >
                    {option.text}
                </label>
              </div>
            ))}
          </div>
        )}
        {question.type === "checkbox" && (
          <div>
            {question.data.options.map((option, ind) => (
              <div key={option.uuid} className="flex items-center">
                <input
                  id={option.uuid}
                  name={"question"+question.id}
                  onChange={(ev) => onCheckboxChange(option, ev)}
                  type="checkbox"
                  className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                />
                <label htmlFor={option.uuid} className="ml-3 block text-sm font-medium text-gray-700" >
                    {option.text}
                </label>
              </div>
            ))}
          </div>
        )}
      </div>
    </fieldset>
  );
}