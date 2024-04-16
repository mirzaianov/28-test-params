import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
// eslint-disable-next-line
import { HiPlusCircle, HiMinusCircle } from 'react-icons/hi';
import './index.css';

const initialTypes = {
  string: 'text',
  number: 'number',
  boolean: 'checkbox',
};

interface Param {
  id: number;
  name: string;
  type: 'string' | 'number' | 'boolean';
}

interface ParamValue {
  paramId: number;
  value: string;
}

interface Model {
  paramValues: ParamValue[];
}

interface Props {
  params: Param[];
  model: Model;
  deleteParam: (index: number) => void;
  // eslint-disable-next-line
  newParam: (name: string, type: any) => void;
  changeParam: (index: number, value: string) => void;
  changeModel: (index: number, value: string) => void;
}

const initialParams: Param[] = [
  { id: 1, name: 'Назначение', type: 'string' },
  { id: 2, name: 'Длина', type: 'string' },
];

const initialModel: Model = {
  paramValues: [
    { paramId: 1, value: 'повседневное' },
    { paramId: 2, value: 'макси' },
  ],
};

// ! Fast refresh only works when a file has exports. Move your component(s) to a separate file.
// eslint-disable-next-line
const ModelView = (propsModel: Model): JSX.Element => {
  return (
    <div className={`mockup-code bg-success text-primary-content`}>
      <pre className={`ml-[2ch] before:!mr-0`}>
        <code className={``}>{JSON.stringify(propsModel, undefined, 2)}</code>
      </pre>
    </div>
  );
};

// ! Fast refresh only works when a file has exports. Move your component(s) to a separate file.
// eslint-disable-next-line
const ParamEditor = (props: Props): JSX.Element => {
  const [isShown, setIsShown] = useState(false);

  const addNew = (e: React.FormEvent) => {
    e.preventDefault();
    const input = document.getElementById('new-param') as HTMLInputElement;
    const type = document.getElementById('new-param-type') as HTMLSelectElement;
    props.newParam(input.value, type.value);
    input.value = '';
  };

  return (
    <div className={`params__editor flex flex-col gap-10`}>
      {/* ! Show current Params */}
      <form className={`params__choice flex flex-col gap-2`}>
        <h2 className={`self-center text-xl`}>Edit Current Params</h2>
        {props.params.map((param) => (
          <div
            className={`input-control flex gap-2`}
            key={param.id}
          >
            <input
              className={`input input-bordered w-full max-w-xs`}
              type="text"
              name={param.id.toString()}
              id={param.id.toString()}
              value={param.name}
              onChange={(e) => props.changeParam(param.id, e.target.value)}
            />
            <select
              className={`select select-bordered w-full max-w-xs`}
              name="type"
              id={param.name.toString()}
              defaultValue={param.type}
            >
              {Object.entries(initialTypes).map((value) => (
                <option
                  key={`${param.id}${value[0]}`}
                  value={value[1]}
                >
                  {value[0]}
                </option>
              ))}
            </select>
            <button
              className="btn btn-outline btn-error p-3"
              type="button"
              onClick={() => props.deleteParam(param.id)}
            >
              <HiMinusCircle className={`h-6 w-6 text-error`} />
            </button>
          </div>
        ))}
      </form>
      {/* ! Add a new Param */}
      <form
        className={`params__add flex flex-col gap-2`}
        onSubmit={addNew}
      >
        <h2 className={`self-center text-xl`}>Add a new Param</h2>
        <div className={`flex gap-2`}>
          <input
            placeholder={`Type a name`}
            className={`input input-bordered w-full max-w-xs`}
            type="text"
            id="new-param"
          />
          <select
            className={`select select-bordered w-full max-w-xs `}
            name="type"
            id="new-param-type"
            defaultValue={`default`}
          >
            <option
              disabled
              value="default"
            >
              Choose a type
            </option>
            {Object.entries(initialTypes).map((value, index) => (
              <option
                key={`add-${index}`}
                value={value[1]}
              >
                {value[0]}
              </option>
            ))}
          </select>
          <button className="btn btn-outline btn-primary p-3">
            <HiPlusCircle className={`h-6 w-6 text-primary`} />
          </button>
        </div>
      </form>
      {/* ! Show the current Model */}
      <div className={`params__list flex flex-col gap-2`}>
        <h2 className={`block self-center text-xl`}>
          Edit Current Model Values
        </h2>
        <ul className={`flex flex-col gap-2`}>
          {props.params.map((param) => (
            <li
              key={param.id}
              className={`flex gap-2`}
            >
              <label
                htmlFor={`params__list-${param.id}`}
                className={`form-control flex w-full max-w-xs basis-4/12`}
              >
                <div className={`label flex-1`}>
                  <span className={`label-text text-base`}>{param.name}</span>
                </div>
              </label>
              <input
                className={`input input-bordered w-full max-w-xs basis-8/12`}
                id={`params__list-${param.id}`}
                type={param.type}
                value={
                  props.model.paramValues.find(
                    (item) => item.paramId === param.id,
                  )?.value
                }
                onChange={(e) =>
                  props.changeModel(param.id, e.target.value || '')
                }
              />
            </li>
          ))}
        </ul>
      </div>
      {isShown ? (
        <button
          className="btn btn-error"
          type="button"
          onClick={() => setIsShown(!isShown)}
        >
          Close Current Model
        </button>
      ) : (
        <button
          className="btn btn-primary"
          type="button"
          onClick={() => setIsShown(!isShown)}
        >
          Show Current Model
        </button>
      )}
      {isShown ? <ModelView {...props.model} /> : null}
    </div>
  );
};

// ! Fast refresh only works when a file has exports. Move your component(s) to a separate file.
// eslint-disable-next-line
const App = (): JSX.Element => {
  const [params, setParams] = useState<Param[]>(initialParams);
  const [model, setModel] = useState<Model>(initialModel);

  const deleteParam = (index: number) => {
    setParams((previous) => previous.filter((item) => item.id !== index));
    setModel({
      ...model,
      paramValues: model.paramValues.filter((item) => item.paramId !== index),
    });
  };

  // eslint-disable-next-line
  const newParam = (name: string, type: any) => {
    const len = params.length;
    // eslint-disable-next-line
    setParams((previous) => [...previous, { id: len + 1, name, type }]);
    setModel({
      ...model,
      paramValues: [...model.paramValues, { paramId: len + 1, value: '' }],
    });
  };

  const changeParam = (index: number, value: string) => {
    setParams((previous) =>
      previous.map((param) =>
        param.id === index ? { ...param, name: value } : param,
      ),
    );
  };

  const changeModel = (index: number, value: string) => {
    setModel({
      ...model,
      paramValues: model.paramValues.map((item) =>
        item.paramId === index ? { ...item, value } : item,
      ),
    });
  };

  return (
    <div
      className={`app flex w-full flex-col items-center justify-center gap-10 p-4 pt-10`}
    >
      <h1 className={`text-5xl`}>Test Task Params</h1>
      <ParamEditor
        model={model}
        params={params}
        deleteParam={deleteParam}
        newParam={newParam}
        changeParam={changeParam}
        changeModel={changeModel}
      />
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
