import React from 'react'
import { AppContext } from '../AppContext'
import '../styles/Landing.scss';

class Landing extends React.Component {


    render() {
        return (

<section className="hero">
    <div className="inner">
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <h1>Лазерная резка 7CUT</h1>
                    <p className="subheader">
                        Резка лазером производится путем воздействия луча высокоэнергетического <br/> 
                        лазера на поверхность детали. Таким образом разрезаемый материал <br/>
                        плавится и испаряется.
                    </p>
                </div>
            </div>
            <div className="row">
                <div className="col-4 hero-card">
                    <img src="/img/sample-icon.svg"/>
                    <div className="hero-card-text">25+ макетов</div>
                </div>
                <div className="col-4 hero-card">
                    <img src="/img/sample-icon.svg"/>
                    <div className="hero-card-text">25+ макетов</div>
                </div>
                <div className="col-4 hero-card">
                    <img src="/img/sample-icon.svg"/>
                    <div className="hero-card-text">25+ макетов</div>
                </div>
            </div>
            <div className="row">
                <button className="button get-cost">
                    Рассчитать стоимость
                </button>
            </div>
        </div>
    </div>
</section>


        );
    }
}


Landing.contextType = AppContext;

export default Landing;
