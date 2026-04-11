import mongoose from 'mongoose';

const resumeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  thumbnailLink: String,
  template: String,
  templateTheme: String,
  colorPlate: String,
  profileInfo: {
    profilePreviewURL: String,
    fullName: String,
    designation: String,
    summary: String
  },
  contactInfo: {
    email: String,
    phoneNumber: String,
    leetcode: String,
    linkedin: String,
    github: String,
    websiteLink: String
  },
  workExperience: [{
    company: String,
    role: String,
    startDate: String,
    endDate: String,
    description: String
  }],
  education: [{
    degree: String,
    institution: String,
    startDate: String,
    endDate: String
  }],
  skills: [{
    name: String,
  }],
  projects: [{
    title: String,
    description: String,
    githubLink: String,
    liveDemoLink: String
  }],
  certifications: [{
    title: String,
    issuer: String,
    year: String
  }],
 achievements: [{
    title: String,
}],
}, { timestamps: true });

export default mongoose.model('Resume', resumeSchema);
