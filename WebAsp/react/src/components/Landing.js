import React from 'react'
import { AppContext } from '../AppContext'
import Slider from 'react-slick'
import '../styles/Landing.scss'

class Landing extends React.Component {


    render() {
        return (
            <div>
                <HeroSection />
                <ProcessSection />
                <MaterialsSection/>
            </div>

        );
    }
}

Landing.contextType = AppContext;


function HeroSection() {
    return (
        <section className="hero">
            <div className="inner">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <h1>Лазерная резка 7CUT</h1>
                            <p className="subheader">
                                Резка лазером производится путем воздействия луча высокоэнергетического <br />
                                лазера на поверхность детали. Таким образом разрезаемый материал <br />
                                плавится и испаряется.
                            </p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-4 hero-card">
                            <img src="/img/sample-icon.svg" alt="" />
                            <div className="hero-card-text">25+ макетов</div>
                        </div>
                        <div className="col-4 hero-card">
                            <img src="/img/sample-icon.svg" alt="" />
                            <div className="hero-card-text">25+ макетов</div>
                        </div>
                        <div className="col-4 hero-card">
                            <img src="/img/sample-icon.svg" alt="" />
                            <div className="hero-card-text">25+ макетов</div>
                        </div>
                    </div>
                    <div className="row">
                        <button className="button get-cost">Рассчитать стоимость</button>
                    </div>
                </div>
            </div>
        </section>
    );
}

function ProcessSection() {
    return (
        <section className="process">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h2>Процесс работы</h2>
                    </div>

                    <div className="col-4 proc-card">
                        <img src="/img/sample-icon.svg" alt="" />
                        <h4 className="proc-subheader">Подзаголовок 1</h4>
                    </div>
                    <div className="col-4 proc-card">
                        <img src="/img/sample-icon.svg" alt="" />
                        <h4 className="proc-subheader">Подзаголовок 1</h4>
                    </div>
                    <div className="col-4 proc-card">
                        <img src="/img/sample-icon.svg" alt="" />
                        <h4 className="proc-subheader">Подзаголовок 1</h4>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 text-center">
                        <button className="button">Рассчитать стоимость</button>
                    </div>
                </div>

                <SliderSection />
            </div>
        </section>
    );
}

function SliderSection() {
    var settings = {
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1
    };

    return (
        <div className="row slider">
            <div className="col-12">
                <Slider {...settings}>
                    <div className="inner">
                        <img src="/img/1.png" alt="Процесс работы"/>
                    </div>
                    <div className="inner">
                        <img src="/img/2.png" alt="Процесс работы"/>
                    </div>
                    <div className="inner">
                        <img src="/img/3.png" alt="Процесс работы"/>
                    </div>
                    <div className="inner">
                        <img src="/img/1.png" alt="Процесс работы"/>
                    </div>
                    <div className="inner">
                        <img src="/img/2.png" alt="Процесс работы"/>
                    </div>
                    <div className="inner">
                        <img src="/img/3.png" alt="Процесс работы"/>
                    </div>
                </Slider>
            </div>
        </div>
    );
}

function MaterialsSection() {
    return (
        <section className="materials container">
            <div className="row">
                <div className="col-12">
                    <h2>Материалы для лазерной резки</h2>
                </div>
            </div>
            <div className="row">
                <div className="col-6 col-lg-4 material-card">
                    <div className="inner">
                        <h3>Медь</h3>
                        <p>
                            Режем преимущественно тонкую листовую медь (до 3 мм), в том числе материал клиента. Медь обладает высокой 
                            теплопроводностью, поэтому для получения качественного реза скорость резки не должна быть высокой.
                        </p>
                    </div>
                </div>
                <div className="col-6 col-lg-4 material-card">
                    <div className="inner">
                        <h3>Латунь</h3>
                        <p>
                            Режем преимущественно тонкую листовую латунь (до 3 мм), в том числе материал клиента. 
                            Выполняем высокоточную резку латуни толщиной.На фото представлены изделия из латуни толщиной 0,2 мм.
                        </p>
                    </div>
                </div>
                <div className="col-6 col-lg-4 material-card">
                    <div className="inner">
                        <h3>Нержавейка</h3>
                        <p>
                            Лазерная резка нержавейки с применением азота позволяет получить неокисленную идеальную кромку. 
                            Режем нержавеющую сталь до 3 мм. Раскрой высокоточный. Минимальная погрешность - 0,01 мм.
                        </p>
                    </div>
                </div>
                <div className="col-6 col-lg-4 material-card">
                    <div className="inner">
                        <h3>Оцинковка</h3>
                        <p>
                            Резка оцинковки осуществляется при использовании азотной среды, 
                            позволяющей исключить горение металла в момент резки. При этом не потребуется 
                            дополнительных операций обработки кромок.
                        </p>
                    </div>
                </div>
                <div className="col-6 col-lg-4 material-card">
                    <div className="inner">
                        <h3>Аллюминий</h3>
                        <p>
                            Алюминий и его сплавы имеют особые теплофизические характеристики, что требует высокой мощности лазера. 
                            Кромка после реза идеальна - нет заусенец и облоя. Детали на листе можно располагать на расстоянии 2 мм.
                        </p>
                    </div>
                </div>
                <div className="col-6 col-lg-4 material-card">
                    <div className="inner">
                        <h3>Дерево</h3>
                        <p>
                            Лазерная резка дерева возможна на толщине до 20 мм в зависимости от вида древесины. 
                            А лазерная гравировка по дереву не ограничена каким-либо видом.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Landing;
