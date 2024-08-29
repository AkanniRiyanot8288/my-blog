const Category = require("../Model/Category/Category");
const appErr = require("../utils/appErr");


// create category
const createCategoryCtrl = async (req, res, next) => {
    const { title } = req.body;
    try {
        const category = await Category.create({ title, user: req.userAuth});
        res.json({
            status: "sucess",
            data: category,
        });
    }catch (error) {
        next(appErr(error.message))
    }
}

// fetch all category

const fetchAllCategoryCtrl = async (req, res, next) => {
    try {
        const category = await Category.find();

        res.json({
            status: "success",
            data: category,
        });
    } catch (error) {
        next(appErr(error.message));
    }
};

//Delete category
const deleteCategoryCtrl = async (req, res, next) => {
    try {
      // Find the category to be deleted
       await Category.findByIdAndDelete(req.params.id);
    
      res.json({
        status: "sucess",
        data: "Category has been deleted successfully",
      });
    }catch (error){
      next(appErr(error.message));
    }
  };

//   single category
const fetchSingleCategoryCtrl = async (req, res, next) => {
     const category = await Category.findById(req.params.id);
     try {
        res.json({
            status: "sucess",
            data: category,
        });
     } catch (error) {
        next(appErr(error.message));
     }
    };


    // update category
    const updateCategory = async (req, res, next) => {
      const { title } = req.body;
        try {
            const category = await Category.findByIdAndUpdate(
                req.params.id,
                { title },
                { new: true, runValidators: true }
            );
            res.json({
                status: "success",
                data: category,
            });
        }   catch (error) {
            next(appErr(error.message));
        }
    };


module.exports = {
    createCategoryCtrl,
    fetchAllCategoryCtrl,
    deleteCategoryCtrl,
    fetchSingleCategoryCtrl,
    updateCategory,
    
};