import { prisma } from "../DB/db.config.js";

//----- First we need to create user
export const createUser = async (req, res) => {
  const { email, name, password } = req.body;

    try {
      
    const IsEmailExist = await prisma.user.findUnique({
      where: { email: email },
    });

    if (IsEmailExist) {
      console.log("Email is already Exist");
      return res
        .status(401)
        .json({ success: false, message: "user email is already Exist" });
        } 
        
      const createUser = await prisma.user.create({
        data: { name, email, password },
      });
      return res.status(200).json({
        success: true,
        message: "user created Successfully",
        data: createUser,
      });
    
  } catch (error) {
    console.log("something went wrong to create user: ", error);
    return res
      .status(402)
      .json({ error: error, message: "something went wrong to create user" });
  }
};

//----- Fetching all users
export const getUsers = async (req, res) => {
try {
    const allUsers = await prisma.user.findMany();
    return res.json({success: true, users: allUsers})
} catch (error) {
    console.log("something went wrong while fetching users: ", error.message);
    return res.json({success: false, error: error.message})
}
}

//----- Get a single user
export const getUser = async (req, res) => {
  const id = req.params.id;
  console.log("params: ", typeof(id))
  try {
    const user = await prisma.user.findFirst({
      where: {id: Number(id)},
    })
    if (user) {
      return res.json({ success: true, user: user });
    } else {
      return res.json({ success: false, message: "User not found"})
    }

    console.log(user)
    
  } catch (error) {
    return res.json({ success: false, error: error.message });
  }
}

//----- update a user ---
export const UpdateUser = async (req, res) => {

  const id = req.params.id;
  const { name, password, email } = req.body;

  try {
    const user = await prisma.user.update({
      where: { id: Number(id) },
      data: {
        name: name,
        password: password,
        email
      }
    })

    return res.json({ success: true, data: user, message: "User record updated successfully" });
    
  } catch (error) {
    return res.json({ success: false, error: error.message });
    
  }
}

// ------ Delete a user ---
export const DeleteUser = async (req, res) => {
  const id = req.params.id;
  
  try {
    const deleteUser = await prisma.user.delete({ where: { id: Number(id) } });
    return res.json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    return res.json({ success: false, error: error.message });
  }
}