import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { FreeMode, Pagination, Autoplay } from 'swiper/modules';
import useCategory from '../hooks/UseCategory';

import "../assets/css/components/CategoriasCarrusel.css";


export default function CategoriasCarrusel() {

    const { categorias, loading } = useCategory();

    if (loading) return <p>Cargando...</p>;


    return (
        <div className="container my-3">
            <h2 className='subtitulo'>Categorías</h2>

            <Swiper
                slidesPerView={4}
                spaceBetween={30}
                freeMode={true}
                pagination={{
                    clickable: true,
                }}
                loop={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                breakpoints={{
                    0: {          // móviles pequeños
                        slidesPerView: 1.3,
                        spaceBetween: 15,
                    },
                    480: {        // móviles grandes
                        slidesPerView: 2,
                        spaceBetween: 20,
                    },
                    768: {        // tablets
                        slidesPerView: 3,
                        spaceBetween: 25,
                    },
                    1024: {       // laptops
                        slidesPerView: 4,
                        spaceBetween: 30,
                    },
                }}
                modules={[FreeMode, Pagination, Autoplay]}
                className="mySwiper"
            >
                {categorias.map((categoria) => (
                    <SwiperSlide key={categoria.categoria_id}>
                        <div className="card-categoria">
                            <span className="accion">Nuevo</span>
                            <img
                                src={categoria.imagen_url}
                                className="card-img-top"
                                alt={categoria.nombre}
                            />
                            <div className="card-body">
                                <h5 className="card-title">{categoria.nombre}</h5>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

        </div >
    );
}
