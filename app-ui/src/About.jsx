import Navbar from "./components/Navbar"
import "./res/about.css"

export default function About(){
    return(
      <>
        <Navbar/>

        <div className="about">
          
          <div className="main-block">
            <p>Monitor Plant Growth In A Smart Way</p>
          </div>

          <div className="block1">
            <p>Monitoring plant health is very important for their fast growth. In this busy world, people 
              usually forget to take proper care of their plants which leads to bad growth and health of 
              their plants. For ensuring complete development of plants, it is necessary to develop proper 
              surrounding conditions in which plants grow. The automatic plant monitoring system has 
              recently attracted tremendous interest due to the potential application in emerging 
              technology. More importantly, this technique is used to enhance the performance of 
              existing techniques or to develop and design new techniques for the growth of plants. The 
              plant monitoring system is helpful for watering the plants and to monitor few factors which 
              are necessary for the growth of plants.
            </p>
            <div></div>
          </div>

          <div className="block2">
              <div></div>
              <p>
                There are various factors that affect the substantial growth of the plant. These factors 
                include moisture, temperature, sunlight, humidity, etc. Basically, according to the plant, 
                the favorable environment is necessary for optimum results. The whole process of 
                irrigation done by the traditional way can be performed using around 20 percent of the 
                water with the help of smart irrigation. Thus, to reduce the large amount of water usage in 
                irrigation, we need smart irrigation system that can save the 80% water being wasted right 
                now. Also, each plant requires a proper amount of light and temperature so that it grows 
                properly. Very high temperature leads to drying of the plant and very low temperature leads 
                to improper spreading and blooming. If the amount of sunlight is not correct then it affects 
                the process of photosynthesis.
                <br></br>
                <br></br>
                Keeping all these factors and taking all the necessary measures for a particular type of plant 
                we have designed a system where in we provide the required favorable environment to the 
                plant to ensure that it grows properly and we also see to it that it is properly nurtured. All 
                this is done in a cost and resource efficient way.
              </p>
            </div> 

          <div className="block3">
            <p>
              It is seen that increased agricultural productivity tend to contribute substantially to an 
              overall economic development of the country. Thus, it will be rational and appropriate to 
              place greater emphasis on further development of the agricultural sector. In order to 
              increase the productivity, farmers these days resort to artificial methods and higher 
              amounts of pesticides instead of focusing on the main needs of the plant. Norman Borlaug, 
              the father of Green Revolution has contributed to the extensive increases in agricultural 
              production. Based on these theorist's ideas, we have come up with a system that focuses on 
              the main factors which enhances the plant's growth. The factors that are essential for a 
              plants growth are delivered to the plant as soon as a need is detected. When the normal 
              range of any factor exceeds, those factors are made unavailable to the plants. The farmer is 
              immediately notified as soon as any change is detected in the factors or the devices. Since 
              this system is simple, farmers can understand it and use it with case. This enhances 
              productivity leading to development of our nation as a whole.
            </p>
            <div></div>
          </div>

        </div>
      </>
    )
}