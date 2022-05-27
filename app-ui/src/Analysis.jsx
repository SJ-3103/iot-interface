import Navbar from "./components/Navbar"
import SideBar from "./components/SideBar"

import './res/analysis.css'
import "./res/helper.css"

export default function Analysis() {
    return(
      <>
        <Navbar/>
        <div className="main-wrapper">
         
          <SideBar/>
          
          <div className="main analysis">
            <div className="main-image">
              <p>Analysis using Machine Learning</p>  
            </div>
            
            <div className="intro">
              <h2>Introduction</h2>
              <p>Random forest is a Supervised Machine Learning Algorithm that is used widely in Classification and Regression problems. It builds decision trees on different samples and takes their majority vote for classification and average in case of regression.</p>
              <p>One of the most important features of the Random Forest Algorithm is that it can handle the data set containing continuous variables as in the case of regression and categorical variables as in the case of classification. It performs better results for classification problems.</p>
            </div>

            <div className="real-life">
              <div>
                <h2>Real Life Analogy</h2>
                <p>Let us dive into a real-life analogy to understand this concept further. A student named X wants to choose a course after his 10+2, and he is confused about the choice of course based on his skill set. So he decides to consult various people like his cousins, teachers, parents, degree students, and working people. He asks them varied questions like why he should choose, job opportunities with that course, course fee, etc. Finally, after consulting various people about the course he decides to take the course suggested by most of the people.</p>
              </div>
              <div id="real-life-image"></div>
            </div>

            <div className="working">
              <h2>Working of Random Forest Algorithm</h2>
              <p>Before understanding the working of the random forest we must look into the ensemble technique. Ensemble simply means combining multiple models. Thus a collection of models is used to make predictions rather than an individual model.</p>
              
              <div className="real-life">
                <div>
                  <p>1. Bagging– It creates a different training subset from sample training data with replacement & the final output is based on majority voting. For example,  Random Forest.</p>
                  <p>2. Boosting– It combines weak learners into strong learners by creating sequential models such that the final model has the highest accuracy. For example,  ADA BOOST, XG BOOST</p>
                </div>
                <div id="working-image"></div>
              </div>
            
              <div className="real-life">
                <div>
                  <h2>Bagging</h2>
                  <p>Bagging, also known as Bootstrap Aggregation is the ensemble technique used by random forest. Bagging chooses a random sample from the data set. Hence each model is generated from the samples (Bootstrap Samples) provided by the Original Data with replacement known as row sampling. This step of row sampling with replacement is called bootstrap. Now each model is trained independently which generates results. The final output is based on majority voting after combining the results of all models. This step which involves combining all the results and generating output based on majority voting is known as aggregation.</p>
                </div>
                <div id="bagging"></div>
              </div>
            
            </div>

            <div className="steps">
              <div>
                <h3>Steps involved in random forest algorithm:</h3>

                <p>Step 1: In Random forest n number of random records are taken from the data set having k number of records.</p>

                <p>Step 2: Individual decision trees are constructed for each sample.</p>

                <p>Step 3: Each decision tree will generate an output.</p>

                <p>Step 4: Final output is considered based on Majority Voting or Averaging for Classification and regression respectively.</p>
              </div>

              <div id="steps"></div>
            </div>

            <div className="features-rf">

              <h2>Important Features of Random Forest</h2>

              <p><b>1. Diversity- </b>Not all attributes/variables/features are considered while making an individual tree, each tree is different.</p>

              <p><b>2. Immune to the curse of dimensionality- </b>Since each tree does not consider all the features, the feature space is reduced.</p>

              <p><b>3. Parallelization- </b>Each tree is created independently out of different data and attributes. This means that we can make full use of the CPU to build random forests.</p>

              <p><b>4. Train-Test split- </b>In a random forest we don’t have to segregate the data for train and test as there will always be 30% of the data which is not seen by the decision tree.</p>

              <p><b>5. Stability- </b>Stability arises because the result is based on majority voting/ averaging.</p>

            </div>

            <div className="reasons">
              <h2>Why we use Random Forest over Decision Tree?</h2>
              <p>1. RMSE(Root Mean Square Error) is observed to be less in Random Forest.</p>
              <p>2. Random Forest uses ensemble technique where as Decision Tree uses CART algorithm which is less efficient than ensemble technique.</p>
              <p>3. Decision Tree technique faces the problem of over-fitting while in Random Forest it can be tackled by the majority random method.</p>
            </div>

          </div>

        </div>
      </>
    )
}