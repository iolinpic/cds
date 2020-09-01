const Quest = require('../models/quests');
const saveConfig = require('../services/saveOnDisk').config;
const saveCsv = require('../services/saveOnDisk').translation;
const { archivate } = require('../services/saveOnDisk');

exports.store = async (req, res) => {
  try {
    const quest = new Quest(req.body);
    await quest.save();
    res.status(200).send(quest);
  } catch (e) {
    res.status(400).send(e);
  }
};
exports.one = async (req, res) => {
  try {
    const quest = await Quest.findById(req.params.id);
    res.status(200).send(quest);
  } catch (e) {
    res.status(400).send(e);
  }
};
exports.update = async (req, res) => {
  try {
    // const data = { ...res.body };
    // data.Stage.forEach((el, arr, index) => {
    //   data.Stage[index].StageDescription = `stage_description_${index}_${req.params.id}`;
    // });
    const quest = await Quest.findById(req.params.id);
    quest.DisplayNameText = req.body.DisplayNameText;
    quest.DescriptionText= req.body.DescriptionText;
    quest.Type= req.body.Type;
    quest.Stage= req.body.Stage;
    await quest.save();
    //const quest = await Quest.findByIdAndUpdate(req.params.id, res.body, { upsert: true, new: true });
    // quest.Stage.forEach((el, arr, index) => {
    //   quest.Stage[index].StageDescription = `stage_description_${index}_${req.params.id}`;
    // });
    // await quest.save();
    res.status(200).send(quest);
  } catch (e) {
    res.status(400).send(e);
    console.log(e);
  }
};
exports.all = async (req, res) => {
  try {
    const quests = await Quest.find();
    res.status(200).send(quests);
  } catch (e) {
    res.status(400).send(e);
  }
};
exports.delete = async (req, res) => {
  try {
    await Quest.findByIdAndRemove(req.params.id);
    res.status(200).send();
  } catch (e) {
    res.status(400).send(e);
  }
};
exports.generate = async (req, res) => {
  try {
    const quests = await Quest.find();
    const namespace = 'quests';
    quests.forEach((el) => {
      const obj = el.toObject();
      const { id, DisplayNameText, DescriptionText } = obj;
      delete obj.id;
      // eslint-disable-next-line no-underscore-dangle
      delete obj._id;
      delete obj.__v;
      delete obj.DisplayNameText;
      delete obj.DescriptionText;
      saveCsv(namespace, [obj.DisplayName, DisplayNameText]);
      saveCsv(namespace, [obj.Description, DescriptionText]);
      obj.Stage.forEach((stage, index) => {
        const stageDescription = `stage_description_${index}_${id}`;
        obj.Stage[index].StageDescription = stageDescription;
        saveCsv(namespace, [stageDescription, stage.StageDescriptionText]);
        const stageName = `stage_name_${index}_${id}`;
        obj.Stage[index].StageName = stageName;
        saveCsv(namespace, [stageName, stage.StageNameText]);
        delete obj.Stage[index].StageDescriptionText;
        delete obj.Stage[index].StageNameText;
        delete obj.Stage[index]._id;
        stage.Goals.forEach((goal, goalIndex) => {
          if (goal.GoalType === 'CustomGoal') {
            const goalDescription = `goal_description_${goalIndex}_${index}_${id}`;
            saveCsv(namespace, [goalDescription, goal.GoalOptions.CustomGoalText]);
            obj.Stage[index].Goals[goalIndex].GoalOptions.CustomGoalText = goalDescription;
          }
          delete obj.Stage[index].Goals[goalIndex]._id;
        });
      });
      saveConfig(namespace, id, obj);
    });
    archivate(namespace, (path) => {
      res.download(path);
      // res.status(200).send({ path });
    });
  } catch (e) {
    res.status(400).send(e);
  }
};
