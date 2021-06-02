import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Row, Spinner } from 'react-bootstrap';
import SearchBox from '../components/SearchBox/SearchBox';
import cityJSON from '../data/cities.json';
import CityModel from '../model/CityModel';
import image from '../asserts/waiting.jpg';
import './Cities.css';
import { Pagination } from 'semantic-ui-react';
import ApiDataService from '../utils/ApiDataService';
import SavedImageCard from '../components/SavedImageCard/SavedImageCard';

export default function Cities() {
    const [cities, setCities] = useState(cityJSON.cities.map((city, index) => new CityModel(city, index)));
    const [searchText, setSearchText] = useState("");
    const [results, setResults] = useState([]);
    const [activeCity, setActiveCity] = useState();
    const [page, setPage] = useState(1);
    const [cityImg, setCityImg] = useState("");
    const [totalPages, setTotalPages] = useState(1);
    const [boundaryRange, setBoundaryRange] = useState(1);
    const [loading, setLoading] = useState(false);
    const [savedImages, setSavedImages] = useState([]);

    const saveImagesCards = savedImages !== undefined ? savedImages.map((saveImage, index) => <SavedImageCard image={saveImage.img} city={saveImage.city} index={index} onDelete={onSavedImageDelete}></SavedImageCard>) : [];

    function handleSearchChange(newSearchText) {
        setSearchText(newSearchText);

        if (newSearchText) {
            debugger
            setResults(cities.filter(element => element.name.toLowerCase().includes(newSearchText.toLowerCase())));
        } else {
            setResults([]);
        }
    }

    async function getCityImages(city) {
        debugger
        const test = results.length > 0 ? console.log("Get Image of " + results[city].name) : null;
        setSearchText([results[city].name])
        setResults([]);
        setPage(1);
        setActiveCity(results[city]);
        setLoading(true);
        const data = await ApiDataService.getCityData(results[city], page);
        setLoading(false);
        setCityImg(data.img);
        setTotalPages(data.totalImages);
    }

    async function handlePaginationChange(e, activePage) {
        //(e, { activePage }) => this.setState({ activePage })
        debugger
        setLoading(true);
        const data = await ApiDataService.getCityData(activeCity, activePage.activePage);
        setLoading(false);
        setCityImg(data.img);
        setTotalPages(data.totalImages);
        setPage(activePage.activePage);
    }

    async function savePicture() {
        console.log("Should save the picture");
        setLoading(true);
        const data = await ApiDataService.getCityData(activeCity, page, "small");
        setLoading(false);
        debugger
        setSavedImages(savedImages => savedImages.concat({img: data.img, city: activeCity.name}));
    }

    function onSavedImageDelete(index) {
        setSavedImages(savedImages => savedImages.slice(0, index).concat(savedImages.slice(index + 1, savedImages.length)));
    }

    return (
        <div className="p-cities">
            <Container>
                <Row>
                    <Col className="saved_pic">
                        {saveImagesCards}
                    </Col>
                    <Col>
                        <SearchBox
                            placeholder="Enter a city"
                            searchText={searchText}
                            onSearchChange={handleSearchChange}
                            results={results.map(result => result.name)}
                            onResultSelected={getCityImages} />
                        <div className="p-cities-img p-2">
                            {loading && <div className="p-cities-spinner"><Spinner animation="border" variant="primary" /></div>}
                            {cityImg == "" && <img src={image} alt="default_img" />}
                            {cityImg != "" && <img src={cityImg} alt="city" />}
                            {cityImg != "" && <Button className="p-cities-save-icon" variant="link" onClick={() => savePicture()}><i className="bi bi-plus-circle-fill" style={{ color: 'lightskyblue' }}></i></Button>}
                        </div>
                        <Pagination className="p-2"
                            activePage={page}
                            boundaryRange={boundaryRange}
                            onPageChange={handlePaginationChange}
                            size='mini'
                            siblingRange={boundaryRange}
                            totalPages={totalPages}
                            // Heads up! All items are powered by shorthands, if you want to hide one of them, just pass `null` as value
                            ellipsisItem={undefined}
                            firstItem={undefined}
                            lastItem={undefined}
                            prevItem={undefined}
                            nextItem={undefined}
                        />
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
