import React from 'react'

const subjectlist = () => {
  

  const subjectupload=async()=>{
    const{subjectName}=e.currentTarget;

  
  }
  return (
    <div>
      <div>
      <form action="" onSubmit={subjectupload}>
        <input type="text" name='subjectName ' id='subject' />
        <label htmlFor="subject">uplod subject</label>
        <button type='submit'>submit</button>
        </form>
      </div>
    </div>
  )
}

export default subjectlist
