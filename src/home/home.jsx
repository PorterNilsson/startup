import React from 'react';
import { NavLink } from 'react-router-dom';
import './home.css'

export function Home() {
  return (
    <main>
      <div className="proverb">
        <p>Random Proverb Placeholder</p>
      </div>

      <nav className="main-selection">
        <button>Articles</button>
        <span> | </span>
        <button>Chat</button>
      </nav>

      <div className="main-content">
      
        <div className="articles">
          <div className="article">
            <img src="nature_1.jpg" width="10%" className="img" />
            <div className="article-content">
              <h3>Lorem, ipsum.</h3>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Velit minima asperiores atque repudiandae 
                aliquam architecto animi, voluptates, quas dolore impedit odio beatae? Veniam, pariatur amet eos 
                itaque assumenda deserunt consequatur sapiente eveniet maiores magni aperiam, porro natus nemo, officiis earum?
              </p>
            </div>
          </div>

          <div>
            <div className="article">
              <img src="nature_2.jpg" width="10%" className="img" />
                <div className="article-content">
                  <h3>Lorem, ipsum dolor.</h3>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius, cum eos recusandae aliquid, quibusdam mollitia in quis 
                    voluptatum excepturi dicta esse, quo inventore! Officia assumenda sed aspernatur dignissimos delectus libero, earum reiciendis 
                    expedita atque quis non ullam nemo possimus totam?
                  </p>
                </div>
            </div>
          </div>

          <div>
            <div className="article">
              <img src="nature_3.webp" width="10%" className="img" />
                <div className="article-content">
                  <h3>Lorem ipsum dolor sit.</h3>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi vel, corrupti sapiente odio assumenda iusto eum repellendus! 
                    Deleniti cum debitis numquam exercitationem quam modi. Harum, placeat nesciunt! Velit, repudiandae. Et distinctio maxime velit consectetur, 
                    illo perspiciatis veritatis laborum quod nisi dolore. Numquam iure et saepe, corporis repudiandae laboriosam illo officia quasi reprehenderit 
                    necessitatibus veniam est aliquam commodi? Consectetur, reiciendis vero?
                  </p>
                </div>
            </div>
          </div>

          <div>
            <div className="article">
              <img src="nature_4.jpeg" width="10%" className="img" />
                <div className="article-content">
                  <h3>Lorem ipsum dolor sit amet.</h3>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti tempora esse, aut et quas libero labore odio sequi blanditiis asperiores 
                    aspernatur vero non, sit voluptate ab delectus reiciendis veritatis? Voluptas optio voluptates perferendis quis! Perspiciatis nihil, illum aliquid nostrum, 
                    delectus quo quam atque, exercitationem mollitia obcaecati voluptatem culpa consequatur ab? Similique beatae laudantium iusto ipsam doloremque veritatis 
                    facilis soluta doloribus necessitatibus accusantium. Enim ullam nulla molestias neque corporis alias ab.
                  </p>
                </div>
            </div>
            </div>
        </div>

        <div className="writers">
          <h2>Writers You Follow</h2>
          <ul>
            <li>
              <NavLink className='nav-link' to='/writer'>Joe Schmoe</NavLink>
            </li>
            <li>
              <NavLink className='nav-link' to='/writer'>Jane Doe</NavLink>
            </li>
            <li>
              <NavLink className='nav-link' to='/writer'>Peter Piper</NavLink>
            </li>
            <li>
              <NavLink className='nav-link' to='/writer'>John Doe</NavLink>
            </li>
            <li>
              <NavLink className='nav-link' to='/writer'>Sally Seashell</NavLink>
            </li>
          </ul>
          <NavLink className='nav-link discover' to='/discover'>Discover</NavLink>
        </div>
      </div>

      <div className="chat">
        <h2>Chat</h2>
        <ul>
          <li>
            <h4>Placeholder Timestamp | Placeholder User</h4>
            <p>Placeholder Chat Message</p>
          </li>
          <li>
            <h4>Placeholder Timestamp | Placeholder User</h4>
            <p>Placeholder Chat Message</p>
          </li>
          <li>
            <h4>Placeholder Timestamp | Placeholder User</h4>
            <p>Placeholder Chat Message</p>
          </li>
          <li>
            <h4>Placeholder Timestamp | Placeholder User</h4>
            <p>Placeholder Chat Message</p>
          </li>
        </ul>
          <input type="text" placeholder="chat" />
      </div>

    </main>
  );
}