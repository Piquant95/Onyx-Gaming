import "./Home.css";
import "../../components/NavBar/NavBar"



export default function Home() {  
    return (
      <div className="home">
        <div className="paralax">
          <div className="paralax-item p-item1"></div>
          <div className="paralax-item p-item2"></div>
          <div className="paralax-item p-item3"></div>
          <div className="paralax-item p-item4"></div>
        </div>
        <div className="container">
          <div className="content-header">
            <h1>Welcome to Onyx Gaming!</h1>
            <h2>Got Game?</h2>
          </div>
          <div className="content">
            <img className="gamericon" style={{marginRight:80}} src="https://i.imgur.com/e6gOX8t.png" alt="GamerCentral" srcset="" />
          </div>
        </div>
         {
          window.addEventListener('scroll', function(e) {
            
            let s = this.scrollY;
            let w = this.outerWidth;
            let h = document.getElementsByClassName('paralax')[0].clientWidth;
            let h_b = document.getElementsByClassName('container')[0].clientWidth;
            let p = s/h*100;
            let p_b = s/h_b*100;
            let opas = 1-1/100*p_b;
            let z_1 = 1 + (w / 10000 * p_b);
            document.getElementsByClassName('p-item4')[0].style= `transform: scale(${z_1});opacity: ${opas}`;
            let z_2 = 1+(w/5000000*p);
            document.getElementsByClassName('p-item1')[0].style= `transform: scale(${z_2})`;
            let hr = w/2000*p_b;
            let z_3 = 1+(w*0.000005*p_b);
            document.getElementsByClassName('p-item2')[0].style= `transform: translate3d(${hr}px,0,0) scale(${z_3})`;
            let hr_2 = w/1500*p_b;
            let z_4 = 1+(w*0.00001*p_b);
            document.getElementsByClassName('p-item3')[0].style= `transform: translate3d(${hr_2}px,0,0) scale(${z_4})`;
          })

}
      </div>
    );
  }