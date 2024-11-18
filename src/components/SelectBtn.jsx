import React,{useId} from 'react'

function SelectBtn({
    options,
    label,
    className='',
    ...props
},ref) {
    const id = useId()
  return (
    <div className='w-full'>
      {label && <label htmlFor={id} className=''></label>}
      <select
      {...props}
      id={id}
      ref={ref}
      className={`px-3 py-2`}>
        {options?.map((option) => (
            <option key={option} value={option}>
                {option}
            </option>
        ))}
          
      </select>
    </div>
  )
}

export default React.forwardRef(SelectBtn)
