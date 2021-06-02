import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import SearchBox from '../components/SearchBox/SearchBox';
import cityJSON from '../data/cities.json';
import CityModel from '../model/CityModel';
import { createClient } from 'pexels';
import image from '../asserts/waiting.jpg';
import './Cities.css';
import { Pagination } from 'semantic-ui-react';

export default function Cities() {
    const [cities, setCities] = useState(cityJSON.cities.map((city, index) => new CityModel(city, index)));
    const [searchText, setSearchText] = useState("");
    const [results, setResults] = useState([]);
    const [cityName, setCityName] = useState();
    const [page, setPage] = useState(1);
    const [cityImg, setCityImg] = useState("");
    const [totalPages, setTotalPages] = useState(1);
    const [paginationItems, setPaginationItems] = useState([]);
    const [boundaryRange, setBoundaryRange] = useState(1);
    // const [paginationGroups, setPaginationGroups] = useState(1);
    // const [currentPaginationIndex, setCurrentPaginationIndex] = useState(1);

    // useEffect(() => {
    //     debugger
    //     let active = page;
    //     let arr = [<Pagination.First />, <Pagination.Prev />];
    //     for (let number = 1; number <= currentPaginationIndex+4; number++) {
    //         arr.push(
    //             <Pagination.Item key={number} active={number === active} onClick={(event) => setPage(event.target.value)}>
    //                 {number}
    //             </Pagination.Item>
    //         );
    //     }
    //     arr.push(<Pagination.Next />);
    //     arr.push(<Pagination.Last />);
    //     setPaginationItems(arr);
    // }, [totalPages, page, currentPaginationIndex]);

    function handleSearchChange(newSearchText) {
        setSearchText(newSearchText);

        if (newSearchText) {
            debugger
            setResults(cities.filter(element => element.name.toLowerCase().includes(newSearchText.toLowerCase())));
        } else {
            setResults([]);
        }
    }

    function getCityImages(city) {
        debugger
        const test = results.length > 0 ? console.log("Get Image of " + results[city].name) : null;
        setSearchText([results[city].name])
        setResults([]);
        setCityName(results[city].name);
        const client = createClient('563492ad6f9170000100000122bbd5b61dd3428b85b45b0b0053b30a');
        const query = results[city].name;
        debugger
        client.photos.search({ page: 1, query, per_page: 1 }).then(photos => {
            debugger
            setCityImg(photos.photos[0].src.medium);
            setTotalPages(photos.total_results);
        });

    }

    function handlePaginationChange(e, activePage) {
        //(e, { activePage }) => this.setState({ activePage })
        debugger
        const client = createClient('563492ad6f9170000100000122bbd5b61dd3428b85b45b0b0053b30a');
        const query = cityName;
        debugger
        const activePageNumber = activePage.activePage;
        client.photos.search({ page: activePageNumber, query, per_page: 1 }).then(photos => {
            debugger
            setCityImg(photos.photos[0].src.medium);
            setTotalPages(photos.total_results);
            setPage(activePageNumber);
        });
    }

    return (
        <div className="p-cities">
            <Container>
                <Row>
                    <Col className="saved_pic">

                    </Col>
                    <Col>
                        <SearchBox
                            placeholder="Enter a city"
                            searchText={searchText}
                            onSearchChange={handleSearchChange}
                            results={results.map(result => result.name)}
                            onResultSelected={getCityImages} />
                        {cityImg == "" && <img src={image} alt="default_img" />}
                        {cityImg != "" && <img src={cityImg} alt="city" />}
                        <Pagination
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
                        {/* <Pagination>
                            <Pagination>{paginationItems}</Pagination>
                        </Pagination> */}
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
