import React from 'react'
import { useContext } from 'react'
import Slider from 'react-slick'
import { AppContext } from '../AppContext'
import { Card, Accordion, useAccordionToggle, AccordionContext } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinus, faPlus, faEnvelope, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'
import { faYoutube, faVk, faInstagram } from '@fortawesome/free-brands-svg-icons'
import '../styles/Landing.scss'


class Landing extends React.Component {


    render() {
        return (
            <div>
                <HeroSection />
                <ProcessSection />
                <MaterialsSection />
                <FAQSection />
                <ContactsSection />
                <FooterSection />
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
                        <img src="/img/1.png" alt="Процесс работы" />
                    </div>
                    <div className="inner">
                        <img src="/img/2.png" alt="Процесс работы" />
                    </div>
                    <div className="inner">
                        <img src="/img/3.png" alt="Процесс работы" />
                    </div>
                    <div className="inner">
                        <img src="/img/1.png" alt="Процесс работы" />
                    </div>
                    <div className="inner">
                        <img src="/img/2.png" alt="Процесс работы" />
                    </div>
                    <div className="inner">
                        <img src="/img/3.png" alt="Процесс работы" />
                    </div>
                </Slider>
            </div>
        </div>
    );
}

function MaterialsSection() {
    return (
        <section className="materials">
            <div className="container">
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
            </div>
        </section>
    )
}

function FAQSection() {
    var questions = [
        { q: 'Что такое лазерная резка', a: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur eveniet ut facere consequuntur, adipisci molestiae possimus ipsam voluptatem minima doloribus laborum, voluptas suscipit labore. Cupiditate necessitatibus eos perspiciatis minima possimus odio nam velit sequi consectetur, mollitia quo repudiandae. Nobis repudiandae voluptas dolorum eligendi a impedit soluta illo tenetur alias officia.' },
        { q: 'Что такое лазерная резка', a: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur eveniet ut facere consequuntur, adipisci molestiae possimus ipsam voluptatem minima doloribus laborum, voluptas suscipit labore. Cupiditate necessitatibus eos perspiciatis minima possimus odio nam velit sequi consectetur, mollitia quo repudiandae. Nobis repudiandae voluptas dolorum eligendi a impedit soluta illo tenetur alias officia.' },
        { q: 'Что такое лазерная резка', a: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur eveniet ut facere consequuntur, adipisci molestiae possimus ipsam voluptatem minima doloribus laborum, voluptas suscipit labore. Cupiditate necessitatibus eos perspiciatis minima possimus odio nam velit sequi consectetur, mollitia quo repudiandae. Nobis repudiandae voluptas dolorum eligendi a impedit soluta illo tenetur alias officia.' },
        { q: 'Что такое лазерная резка', a: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur eveniet ut facere consequuntur, adipisci molestiae possimus ipsam voluptatem minima doloribus laborum, voluptas suscipit labore. Cupiditate necessitatibus eos perspiciatis minima possimus odio nam velit sequi consectetur, mollitia quo repudiandae. Nobis repudiandae voluptas dolorum eligendi a impedit soluta illo tenetur alias officia.' },
        { q: 'Что такое лазерная резка', a: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur eveniet ut facere consequuntur, adipisci molestiae possimus ipsam voluptatem minima doloribus laborum, voluptas suscipit labore. Cupiditate necessitatibus eos perspiciatis minima possimus odio nam velit sequi consectetur, mollitia quo repudiandae. Nobis repudiandae voluptas dolorum eligendi a impedit soluta illo tenetur alias officia.' }
    ];
    return (
        <section className="faq container">
            <div className="row">
                <div className="col-12">
                    <h2>Вопрос-ответ</h2>
                </div>
                <div className="col-12">
                    <Accordion>
                        {questions.map((item, i) =>
                            <Card key={i + 1}>
                                <Card.Header>
                                    <FAQAccordionToggle eventKey={i + 1}>
                                        {item.q}
                                    </FAQAccordionToggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey={i + 1}>
                                    <Card.Body>
                                        {item.a}
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                        )
                        }
                    </Accordion>
                </div>
            </div>
        </section>
    )
}

function FAQAccordionToggle({ children, eventKey, callback }) {
    const currentEventKey = useContext(AccordionContext);

    const decoratedOnClick = useAccordionToggle(
        eventKey,
        () => callback && callback(eventKey),
    );

    const isCurrentEventKey = currentEventKey === eventKey;

    return (<div className="inner" onClick={decoratedOnClick}>
        { children}
        { isCurrentEventKey ? <FontAwesomeIcon icon={faMinus} /> : <FontAwesomeIcon icon={faPlus} />}
    </div>);
}

function ContactsSection() {

    return (

        <section className="contact container">
            <div className="row">

                <div className="col-12">
                    <h2>Контакты</h2>
                </div>

                <div className="col-5">
                    <div className="caption">Адрес:</div>
                    <div className="value">г. Москва, Красная Площадь, дом 1</div>
                    <div className="caption">Телефон:</div>
                    <div className="value">+7(999)999-99-99</div>
                    <div className="caption">Email:</div>
                    <div className="value">7cut@gmail.com</div>
                    <div className="caption">Часы работы:</div>
                    <div className="value">ежедневно с 8:00 до 22:00</div>
                    <div className="caption">Соцсети:</div>
                    <div className="value social-icons">
                        <span><FontAwesomeIcon icon={faYoutube} /></span>
                        <span><FontAwesomeIcon icon={faVk} /></span>
                        <span><FontAwesomeIcon icon={faInstagram} /></span>
                    </div>
                    <button className="button get-cost">Заказать обратный звонок</button>

                </div>

                <div className="col-7">
                    <iframe width="100%" height="530" frameborder="0" title="map"
                        src="https://yandex.com/map-widget/v1/?um=constructor%3A3f315d6c301076ae14c3abfd9232413e2bf799624c8ba86be7d6c2344d7273bd&amp;source=constructor" >
                    </iframe>
                </div>
            </div>
        </section>


    )

}

function FooterSection() {
    return (
        <footer className="footer">
            <div className="container">
                <div className="row">
                    <div className="col-sm">
                        <div>ЛОГОТИП</div>
                    </div>
                    <div className="col-sm">
                        <div className="footer-link">ИП Иванов Иван Иванович </div>
                        <div className="footer-link">ОГРНИП: 325171828473829</div>
                    </div>
                    <div className="col-sm">
                        <div className="footer-link">ИНН: 325234561782</div>
                        <div className="footer-link">Дата присвоения ОГРНИП: 01.01.2011</div>
                    </div>
                    <div className="col-sm">
                        <div className="footer-link">
                            <FontAwesomeIcon icon={faEnvelope} />
                            7cut@gmail.com
                        </div>
                        <div className="footer-link">
                            <FontAwesomeIcon icon={faMapMarkerAlt} />
                            г. Москва, Красная Площадь, дом 1
                        </div>
                    </div>
                    <div className="col-sm">
                        <div className="social-icons">
                            <span><FontAwesomeIcon icon={faYoutube} /></span>
                            <span><FontAwesomeIcon icon={faVk} /></span>
                            <span><FontAwesomeIcon icon={faInstagram} /></span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}



export default Landing;
