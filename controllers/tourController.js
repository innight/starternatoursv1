const Tour = require('./../models/tourModel');
const APIFeatures = require('./../utils/apiFeatures');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('../appError');
//Handle HTTP
exports.getAllTours = catchAsync(async (req, res, next) => {
  //****ALTERADO PARA CLASS */
  // const queryObj = { ...req.query }; //ES6 desctruction;
  // const excludeFields = ['page', 'sort', 'limit', 'fields'];
  // excludeFields.forEach(el => delete queryObj[el]);

  // // Advanced Filterings
  // let queryStr = JSON.stringify(queryObj);
  // queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
  // console.log(JSON.parse(queryStr));

  // const query = Tour.find(JSON.parse(queryStr));
  //BUILD QUERYS
  //Usado para remover page/sorte/limite/fields do req.params!

  //EXECUTE QUERY
  const features = new APIFeatures(Tour.find(), req.query).filter();
  const tours = await features.query;

  //SEND RESPONSE
  res.status(200).json({
    status: 'sucess',
    data: { contador: tours.length, tours: tours }
  });
});

exports.getTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findById(req.params.id);

  if (!tour) {
    return next(new AppError('No tour found with that ID', 404));
  }

  res.status(200).json({
    status: 'sucess',
    data: {
      tour: tour
    }
  });
});

exports.createTour = catchAsync(async (req, res, next) => {
  const newTour = await Tour.create(req.body);
  res.status(201).json({
    status: 'sucess',
    data: { tour: newTour }
  });

  // try {
  //   //const newTour = new tour({};
  //   //newTour.save();
  //   const newTour = await Tour.create(req.body);
  //   res.status(201).json({
  //     status: 'sucess',
  //     data: { tour: newTour }
  //   });
  // } catch (err) {
  //   res.status(400).json({
  //     status: 'error',
  //     message: 'invalid input'
  //   });
  // }
});

exports.updateTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!tour) {
    return next(new AppError('No tour found with that ID', 404));
  }

  res.status(200).json({
    status: 'sucess',
    data: { tour: tour }
  });
});

exports.deleteTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findByIdAndDelete(req.params.id);

  if (!tour) {
    return next(new AppError('No tour found with that ID', 404));
  }

  res.status(204).json({
    status: 'sucess',
    data: 'delete sucess'
  });
});
