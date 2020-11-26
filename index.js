/*source references: http://www.tutorialspark.com/jqueryUI/jQuery_UI_Selectable_Events.php ,https://stackoverflow.com/questions/3946462/jquery-ui-selectable-unselect-selected-item-on-click , https://api.jqueryui.com/selectable/
*/
import './style.css';

//import AgentsApi
import { AgentsApi } from './agentsApi.js'; 

const myAgentApi = new AgentsApi();

var data = myAgentApi.listAgents();
data.resolved;

//get container
let container = document.querySelector('.container');

var memoryArray = []; 
var logicArray = []; 
var planArray = []; 
var threeCards = new Boolean(false); 

//returned promise: This next block grabs data and creates cards for each agent.
data.then(function(result) {
  //iterate through AGENTS
  for (let i = 0; i <= result.length; i++) {
    var myCard = document.createElement("div");
    myCard.innerHTML = result[i].name;
    let agentId = "agent" + i; 
    //append card to container
    container.appendChild(myCard);
    myCard.setAttribute("class", "ui-widget-content");
    myCard.setAttribute("id", agentId);
    
    //Agent Description
    var description = document.createElement("p");
    //grab each result's description
    var node = document.createTextNode(result[i].description);
    description.appendChild(node); 
    //append under myCards 
    myCard.appendChild(description);

    /*iterate through results' task properties and assign tasks to their correct respective agent. 
    */
    for (let j = 0; j < result[i].tasks.length; j++) {
      let tasksObj = result[i].tasks[j]; 
     
      if(tasksObj.category == 'memory'){
        let memoryScore;
        memoryScore = tasksObj.score;
        memoryArray.push(memoryScore);
      }

      if(tasksObj.category == 'logic'){
        let logicScore; 
        logicScore = tasksObj.score; 
        logicArray.push(logicScore); 
      }

      if(tasksObj.category == 'planning'){
        let planScore; 
        planScore = tasksObj.score; 
        planArray.push(planScore); 
      }
    }

    //Average Task Calculations
    //calculate average memory score
    var memoryAvgVal = average(memoryArray); 
    var taskMemory = document.createElement("p");
    var memoryNode = document.createTextNode("Memory Score: " + memoryAvgVal);
    taskMemory.appendChild(memoryNode); 
    taskMemory.setAttribute("class", "memoryScore");
    //append to myCards
    myCard.appendChild(taskMemory);
    memoryArray = []; 

    //calculate average logic score 
    var logicAvgVal = average(logicArray); 
    var taskLogic = document.createElement("p");
    var logicNode = document.createTextNode("Logic Score: " + logicAvgVal);
    taskLogic.appendChild(logicNode);
    taskLogic.setAttribute("class", "logicScore"); 
    //append to myCards
    myCard.appendChild(taskLogic);
    logicArray = [];  

    //calculate average planning score
    var planAvgVal = average(planArray);
    var taskPlan = document.createElement("p"); 
    var planNode = document.createTextNode("Planning Score: " + planAvgVal);
    taskPlan.appendChild(planNode);
    taskPlan.setAttribute("class", "planningScore"); 
    //append to myCard
    myCard.appendChild(taskPlan);
    planArray = [];
  }
});


function average(nums) {
  return nums.reduce((a, b) => (a + b)) / nums.length;
}
//hide display & cancel on first arrival as to minimize visual clutter
$('.displayContainer').hide();
$('button').hide();  
var selected = []; 

var selectableList = $('#selectable'); 
$(document).ready(function() {
  //cached selected objects
  var displayDiv = document.getElementById("display");  

  //allow for multiselect
  $('#selectable').bind("mousedown", function(e) {e.metaKey = true;})
  .selectable(); 
  
  //$('.container > div > p').selectable("disable");
  
  selectableList.selectable({
    selected: function (event, ui){

      let selectedAgent = $(ui.selected);
      //console.log(selectedAgent);

      if (selectedAgent.hasClass('selectedfilter')){
        selectedAgent.removeClass('selectedfilter'); 
        //do unselected stuff
      } 
      if (!selectedAgent.hasClass('selectedfilter')) {
        selectedAgent.addClass('selectedfilter');
        selected.push(selectedAgent); 
       //console.log(selected);

        //show display container when an agent is selected
        selectedAgent.click(function(){
          $('.displayContainer').show();
          $('button').show(600); 
        });
        
         //do selected stuff
        if (displayDiv.childNodes.length < 2 ){
          let cloneAgent = selectedAgent.clone(); 
          cloneAgent.appendTo('.displayContainer');
          cloneAgent.addClass("boldData");
        }
      }
    }, 
    unselected: function (event, ui){
      $(ui.unselected).removeClass('selectedfilter');
      selected.pop($(ui.unselected)); 
      /*for (let i = 0; i < selected.length; i++){
        if( $(ui.unselected).hasClass("ui-selected") == selected[i].hasClass("ui-selected")) {
          $('.container div .ui-selected').remove(this); 
           console.log(displayDiv.childNodes.length);
        } *not working yet*
        this block of code was an attempt to allow users to be able to deselect their agents either in the container or display container and be able to change out one or both agents for comparison. The clear button allows users to start a whole new pair of comparisons, but in the case that they may only want to change one agent out, they should be able to do so by easily deselecting the object they had just selected. 
      } */ 
    }, 
  }); 

  function removeDisplay(agnt){
    $('.displayContainer').remove(agnt); 
  }

  /*clear button should appear only when the user has clicked at least one card. I want as little visual clutter as much as possible for the users to be able to focus only what matters most: Comparing Agents and their details
  */
  $( "button" ).click(function(){
      $('button').hide();
      $('.displayContainer').hide();
      //remove selected agents from being visibly selected 
      $('.container .ui-selected').removeClass('ui-selected');
      //emtpy display container
      $('.displayContainer').empty();
  });

  /*TO SEE AGENTS AMONG A LIBRARY OF MOCK AGENTS, Comment out the block below. Seeing the Agents among a libray of agents can help deliver the intended user experience. If it's too distracting now, and you only want to see the core agents from the current api, comment the block below out. Thank you!*/
  /*
  for (let i = 0; i <= 8; i++) {
    var exampleCards = document.createElement("div");
    exampleCards.innerHTML = "Agent Mock";
    container.appendChild(exampleCards).after(exampleCards);
    exampleCards.setAttribute("class", "ui-widget-content");
  } 
  */
  
});

