import Users from './users.js';
// import Plants from './plants.js';

const getAllUsers = async (req, res)=>{
    try {
        const users = await Users.find({});
        if(!users){
            return res.status(404).json({
                message: 'Users not found',
                data: {},
                error: true,
            });
        }
        return res.status(202).json({
            message: 'Users:',
            data: users,
            error: false,
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message,
            data: {},
            error: true,
        });
    }
};

const getUserById  = async (req, res) => {
    try {
        const user = await Users.findById(req.params.id);
        if(!user) {
            return res.status(404).json({
                message: 'User not found',
                data: {},
                error: true,
            });
        }
        return res.status(200).json({
            message: `User with ID:${req.params.id} found`,
            data: user,
            error: false,
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message,
            data: {},
            error: true,
        })
    }
}

const createUser = async (req, res) => {
    try {
        const user = new Users({
            firstName: req.body.firstName,
            plant_family: req.body.plant_family,
            germination_date: req.body.germination_date,
            grow_mode: req.body.grow_mode,
        });

        const result = await user.save();
        return res.status(201).json({
            message: 'User successfully created',
            data: result,
            error: false,
        });
    } catch (error) {
        return res.status(400).json({
            message: 'Error when creating new user',
            data: {},
            error: true,
        })
    }
}

const createPlant = async (req, res) => {
  try {
      const plant = new Plants({
          plant_name: req.body.plant_name,
          plant_family: req.body.plant_family,
          germination_date: req.body.germination_date,
          grow_mode: req.body.grow_mode,
      });

      const result = await plant.save();
      return res.status(201).json({
          message: 'Plant successfully added',
          data: result,
          error: false,
      });
  } catch (error) {
      return res.status(400).json({
          message: 'Error when adding new plant',
          data: {},
          error: true,
      })
  }
}

const deleteUser = async (req, res) => {
    try {
      if (!req.params.id) {
        return res.status(400).json({
          message: 'Missing Id parameter',
          data: undefined,
          error: true,
        });
      }
      const result = await Users.findByIdAndDelete(req.params.id);
      if (!result) {
        return res.status(404).json({
          message: `User with ID ${req.params.id} has not been found`,
          data: undefined,
          error: true,
        });
      } return res.status(200).json({
        message: 'User has been successfully deleted',
        data: result,
        error: false,
      });
    } catch (error) {
      return res.status(400).json({
        message: error,
        data: undefined,
        error: true,
      });
    }
  };

  // const deletePlant = async (req, res) => {
  //   try {
  //     if (!req.params.id) {
  //       return res.status(400).json({
  //         message: 'Missing Id parameter',
  //         data: undefined,
  //         error: true,
  //       });
  //     }
  //     const result = await Plants.findOneAndDelete()
  //     if (!result) {
  //       return res.status(404).json({
  //         message: `User with ID ${req.params.id} has not been found`,
  //         data: undefined,
  //         error: true,
  //       });
  //     } return res.status(200).json({
  //       message: 'User has been successfully deleted',
  //       data: result,
  //       error: false,
  //     });
  //   } catch (error) {
  //     return res.status(400).json({
  //       message: error,
  //       data: undefined,
  //       error: true,
  //     });
  //   }
  // };

  const updateUser = async (req, res) => {
    try {
      if (!req.params) {
        return res.status(404).json({
          message: 'Missing id parameter',
          data: undefined,
          error: true,
        });
      }
      const result = await Users.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true },
      );
      if (!result) {
        return res.status(404).json({
          message: 'User has not been found',
          data: undefined,
          error: true,
        });
      }
      return res.status(200).json({
        message: 'User successfully updated',
        data: result,
        error: false,
      });
    } catch (error) {
      return res.status(400).json({
        message: error,
        data: undefined,
        error: true,
      });
    }
  };

  export default {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    createPlant
  }