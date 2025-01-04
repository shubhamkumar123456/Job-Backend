
let JobCollection = require('../models/Job')
const createJob = async(req,res)=>{
    //const (title,description,company)
     let {role,_id} = req.user
     if (role!=='company') {
      return  res.json({msg:"not authorized to create a job post",success:false})
     }
    try {
        let data = await JobCollection.create({...req.body,userId:_id});
        res.json({msg:"jobPost created successfully",success:true,data})
    } catch (error) {
        res.json({msg:"error in creating Job post",success:false,error:error.message})
    }

}
const updateJob = async(req,res)=>{
  let _id = req.params._id;
  let {role} = req.user
  if (role!=='company') {
   return  res.json({msg:"not authorized to update a job post",success:false})
  }
  try {
    const updatedJob = await JobCollection.findByIdAndUpdate( _id , {$set:req.body}, {new:true});
    res.json({ msg: "Job updated successfully", success: true, job:updateJob });
  } catch (error) {
    res.status(500).json({ msg: "Error in  updating job post", success: false, error: error.message });
  }

}
const deleteJob = async(req,res)=>{
    let _id = req.params._id;
    let {role} = req.user
    if (role!=='company') {
     return  res.json({msg:"not authorized to delete a job post",success:false})
    }
    try {
               
                let data = await JobCollection.findByIdAndDelete(_id) 
        
                res.json({ msg: "Job deleted successfully", success: true });
            } catch (error) {
                res.status(500).json({ msg: "Error deleting job", success: false, error: error.message });
            }
}
const getAllJob = async(req,res)=>{
    try {
                const jobs = await JobCollection.find();
                res.json({msg: "get all jobs", success: true, jobs });
            } catch (error) {
                res.status(500).json({ msg: "Error fetching jobs", success: false, error: error.message });
            }
}
const singleCompanyJobs=async(req,res)=>{
    let _id = req.user._id;
    try {
     let jobs =await JobCollection.find({userId:_id});
     res.json({msg:'get successfully', success:true,jobs});
    } catch (error) {
     res.json({msg:"error in getting jobs", success:false,error:error.message})
    }
}

const countNumbers =async(req,res)=>{
    let userId =req.user;
    try {
      let findJob = await JobCollection.find({userId});
      console.log(findJob)

      let appliedUserCounts = 0;

      findJob.forEach((jobObj)=>{
        appliedUserCounts = appliedUserCounts+ jobObj.applicants.length
      })
      console.log(appliedUserCounts)
      let totalJobPost = findJob.length;

      res.json({msg:"get successfully",success:true,jobCount:totalJobPost, appliedCount:appliedUserCounts })

    } catch (error) {
        res.json({msg:"error in getting counts",success:false,error:error.message})
    }
}

const searchJob = async(req,res)=>{
    const {title,location} = req.query;

    let obj = {};
    if (title) {
        obj.title = { $regex: title, $options: 'i'}
    }
    if (location) {
        obj.location = { $regex: location, $options: 'i'}
        
    }

    let jobs = await JobCollection.find(obj);
    res.json(jobs)
}

module.exports ={
    createJob,
    updateJob,
    deleteJob,
    getAllJob,
    singleCompanyJobs,
    countNumbers,
    searchJob
}


