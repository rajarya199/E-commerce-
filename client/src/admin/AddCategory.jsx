import React ,{useState} from "react";
import { isAuthenticated } from "../auth";
import { addcategory } from "./apiIndex";
const AddCategory = () => {
  const[category_name,setCategory]=useState('')
  const[error,setError]=useState(false)
  const[success,setSuccess]=useState(false)

  //token destructure from localstorage
  const {token}= isAuthenticated()
  const handleChange=e=>{
      setError('')
      setCategory(e.target.value.toLowerCase())
  }
  const handleSubmit=e=>{
      e.preventDefault()
      setError('')
      setSuccess(false)
      //make a call request to addcategory function
      addcategory(token,{category_name})
      .then(data=>{
        console.log(data)
          if(data.error){
              setError(data.error)
              setSuccess(false)
          }
          else{
              setError('')
              setSuccess(true)
              setCategory('')
          }
      })
  }
  //to show error msg style={{display:error ? '':'none'}} 
const showError = () => (
  <div
  style={{display:error ? '':'none'}}
    className={`bg-red-800 border border-red-500 text-red-100 px-4 py-3 rounded mb-4 shadow-md transition-opacity duration-300 `}
    role="alert"
  >
    {error}
  </div>
);

const showSuccess = () => (
  <div
  style={{display:success ? '':'none'}}
    className={`bg-amber-700 border border-amber-500 text-amber-100 px-4 py-3 rounded mb-4 shadow-md transition-opacity duration-300 ` }
    role="alert"
  >
    New category added
  </div>
);

return (
  <>
  <div className="max-w-md mx-auto my-8 px-4">
  <form className="shadow-lg p-6 rounded-lg bg-vnbg-100 border border-vnbrd-100" onSubmit={handleSubmit}>
    <h3 className="text-center text-vntx-100 text-2xl font-semibold mb-6">Add Category</h3>

    {showError()}
    {showSuccess()}

    <div className="mb-4">
      <label htmlFor="category" className="block mb-2 text-vntx-200 font-medium">
        Category Name
      </label>
      <input
        type="text"
        id="category"
        className="w-full px-4 py-2 rounded border border-vnbrd-100 bg-vninp-100 text-vntx-400 placeholder-vninpl-100 focus:outline-none focus:ring-2 focus:ring-vntx-200"
        onChange={handleChange}
        value={category_name}
        placeholder="Enter category name"
      />
    </div>

    <div className="mb-2">
      <button
        type="submit"
        className="w-full bg-vnbtn-100 hover:bg-vnbtn-200 text-vnbg-100 font-semibold py-2 rounded transition-colors duration-200"
      >
        Add
      </button>
    </div>
  </form>
</div>

  
  </>
)
}

export default AddCategory