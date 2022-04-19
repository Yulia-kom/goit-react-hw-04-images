import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Puff } from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import Searchbar from "./Searchbar";
import ImageGallery from "./ImageGallery";
import Button from "./Button";
import Modal from "./Modal";
import fetchImages from "./services/api";

export default function App() {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [isPending, setIsPending] = useState(false);
  // const [isModalOpen, setIsModalOpen] = useState({ isModalOpen: false });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImg, setModalImg] = useState("");
  const [modalAlt, setModalAlt] = useState("");

  const handleSetQuery = (event) => {
    setQuery(event.currentTarget.value);
  };

  useEffect(() => {
    if (!query) {
      return;
    }
    if (isPending) {
      fetchImages(query, page)
        .then((img) => {
          if (img.length === 0) {
            toast(`Нет картинок с запросом "${query}"`);
            setImages([]);
            setIsPending(false);

            return;
          }
          setImages((prev) => [...prev, ...img]);
          setIsPending(false);
        })
        .catch((error) => {
          console.log(error.massage);
        });
    }
  }, [isPending, page, query]);

  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (query.trim() === "") {
      return toast("Введите название");
    }
    setImages((prev) => []);
    setPage(1);
    setIsPending(true);
  };

  const handleTogleModal = (image, alt) => {
    // setIsModalOpen((prev) => ({
    //   isModalOpen: !prev.isModalOpen,
    //   modalImg: image,
    //   modalAlt: alt,
    // }));

    setIsModalOpen((prev) => !prev);
    setModalAlt(alt);
    setModalImg(image);
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
    setIsPending(true);
  };

  return (
    <div style={{ textAlign: "center", padding: 20 }}>
      <Searchbar handleSetQuery={handleSetQuery} query={query} handleFormSubmit={handleFormSubmit} />
      <ImageGallery images={images} handleTogleModal={handleTogleModal} />
      <ToastContainer autoClose={3000} />
      {isPending && <Puff ariaLabel="loading" color="#00BFFF" height={60} width={60} />}
      {images.length >= 12 && <Button handleLoadMore={handleLoadMore} />}
      {isModalOpen && <Modal modalImg={modalImg} handleTogleModal={handleTogleModal} tag={modalAlt} />}
    </div>
  );
}

// export default class App extends Component {
//   state = {
//     query: '',
//     page: 1,
//     isPending: false,
//     isModalOpen: false,
//     images: [],
//     modalImg: '',
//     modalAlt: '',
//   };

//   handleSetQuery = ({ target: { name, value } }) => {
//     this.setState({ [name]: value });
//   };

//   handleFormSubmit = event => {
//     event.preventDefault();

//     if (this.state.query.trim() === '') {
//       toast.error('Введите название');
//       this.setState({ images: [] });
//       return;
//     }

//     this.setState({ isPending: true, page: 1 });
//   };

//   handleTogleModal = (image, alt) => {
//     this.setState(prev => ({
//       isModalOpen: !prev.isModalOpen,
//       modalImg: image,
//       modalAlt: alt,
//     }));
//   };

//   handleLoadMore(event) {
//     this.setState(prev => ({ page: prev.page + 1, isPending: true }));
//   }

//   componentDidUpdate() {
//     const { query, page, isPending } = this.state;
//     if (isPending) {
//       fetchImages(query, page)
//         .then(img => {
//           if (img.length === 0) {
//             return (
//               this.setState({ isPending: false }),
//               toast(`Нет картинок с запросом "${query}"`)
//             );
//           }

//           this.setState(prev => ({
//             images: this.state.page > 1 ? [...prev.images, ...img] : img,
//             isPending: false,
//           }));
//         })
//         .catch(error => {
//           console.log(error.message);
//           this.setState({ isPending: false });
//         });
//     }
//   }

//   render() {
//     const { isModalOpen, images, query, modalImg, modalAlt, isPending } =
//       this.state;
//     const {
//       handleSetQuery,
//       handleFormSubmit,
//       handleTogleModal,
//       handleLoadMore,
//     } = this;
//     return (
//       <div style={{ textAlign: 'center', padding: 20 }}>
//         <Searchbar
//           handleSetQuery={handleSetQuery}
//           query={query}
//           handleFormSubmit={handleFormSubmit}
//         />
//         <ImageGallery images={images} handleTogleModal={handleTogleModal} />
//         <ToastContainer autoClose={3000} />
//         {isPending && (
//           <Puff ariaLabel="loading" color="#00BFFF" height={60} width={60} />
//         )}
//         {images.length >= 12 && (
//           <Button handleLoadMore={handleLoadMore.bind(this)} />
//         )}
//         {isModalOpen && (
//           <Modal
//             modalImg={modalImg}
//             handleTogleModal={handleTogleModal}
//             tag={modalAlt}
//           />
//         )}
//       </div>
//     );
//   }
// }
