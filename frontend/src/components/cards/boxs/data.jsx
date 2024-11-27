import React from 'react';
import './data.css'
import Blog1 from '/blog/blog1.jpg'
import Blog12 from '/blog/blog12.jpg'

const BlogPost = () => {
  return (
    <div>
      
      <div className="content1">
        <div className="img1">
          <img src={Blog1} width="612" height="435" alt="Tree Blog 1" />
        </div>
        <div className="blog-content">
          <h6>10 August 2021 | Rithik Swargam</h6>
          <h2>Why We Should Be Thankful Of Every Single Tree?</h2>
          <p>
            A single tree can take in an entire stadium worth of carbon dioxide from the air,
            reduces surrounding temperature up to 4 degrees, provide a home to a dozen birds 
            and gives us oxygen for free.<br/><br/>

            Planting a tree is one of the easiest and most powerful things you can do to have a 
            positive impact on the environment.<br/><br/>

            According to the Arbor Day Foundation, in one year a mature tree will absorb more than 
            48 pounds of carbon dioxide from the atmosphere and release oxygen in exchange.<br/><br/>

            Trees produce oxygen, intercept airborne particulates, and reduce smog, enhancing a 
            community’s respiratory health.<br/><br/>

            Access to trees, green spaces, and parks promotes greater physical activity and reduces 
            stress while improving the quality of life in our cities and towns.<br/><br/>
          </p>
        </div>
      </div>

      {/* Content 2 */}
      <div className="content2">
        <div className="down-content">
          <h3>Look at what a single tree can do – benefits which you never imagined.</h3>
          <ul>
            <li>The tree serves as the “heart of nature” for those living in the city. It connects us with the seasons by reminding us of trees blossoming, flowers, and the leaves of fall.</li><br/>
            <li>One tree can absorb 20 kg. of dust annually, and “swallow up” 80 kg. of suspensions, containing toxic metals such as mercury, lithium, lead etc.</li><br/>
            <li>Urban landscaping, including trees, helps lower crime rates.</li><br/>
            <li>Studies show that urban vegetation slows heartbeats, lowers blood pressure, and relaxes brain wave patterns.</li><br/>
            <li>Girls with a view of nature and trees at home score higher on tests of self-discipline.</li><br/>
            <li>A tree is a natural air conditioner. The evaporation from a single tree can produce the cooling effect of ten room-size, residential air conditioners operating 20 hours a day.</li><br/>
            <li>Urban forests promote beneficial water quality and reduce storm water management costs.</li><br/>
            <li>Trees provide important habitats for numerous birds, insects and animal species.</li><br/>
            <li>Homes landscaped with trees sell more quickly and are worth 5% to 15% more than homes without trees.</li><br/>
            <li>The color green is calming and relieves eye strain.</li><br/>
            <li>Trees absorb and block sound, reducing noise pollution by as much as 40 percent.</li><br/>
          </ul>

          <p>
            Trees and plants are not merely important in our lives but they are synonymous to our lives.<br/><br/>
            <h3>So next time you take a deep breath of air, give credit to a tree or hug a tree in thanks for what it gives us – the very best air we breathe.</h3><br/>
          </p>
        </div>

        <div className="img2">
          <img src={Blog12} width="550" height="700" alt="Tree Blog 2" />
        </div>
      </div>
    </div>
  );
}

export default BlogPost;
