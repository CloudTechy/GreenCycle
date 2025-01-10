import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";
import {
  fetchCenters,
  deleteCenter,
  createCenter,
  updateCenter,
} from "../services/api";
import { FaEdit, FaTrash } from "react-icons/fa";

const CentersPage = () => {
  const [centers, setCenters] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);
  const [loadingCenters, setLoadingCenters] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [newCenter, setNewCenter] = useState({
    name: "",
    location: "",
    city: "",
    address: "",
    website: "",
    latitude: "",
    longitude: "",
    phone: "",
  });

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewCenter({ ...newCenter, [name]: value });
  };

  const handleAddCenter = async () => {
    if (editIndex !== null) {
      const updatedCenters = centers.map((center, index) =>
        index === editIndex ? newCenter : center
      );
      try {
        await updateCenter(centers[editIndex].id, newCenter);
        setCenters(updatedCenters);
        setEditIndex(null);
        handleClose();
      } catch (err) {
        setError("Failed to update recycling center. Please try again later.");
        console.error(
          "Failed to update recycling center. Please try again later."
        );
      }
    } else {
      try {
        await createCenter(newCenter);
        setCenters([...centers, newCenter]);
      } catch (err) {
        setError("Failed to add recycling center. Please try again later.");
        console.error(
          "Failed to add recycling center. Please try again later."
        );
      }
      setNewCenter({
        name: "",
        location: "",
        city: "",
        address: "",
        website: "",
        latitude: "",
        longitude: "",
        phone: "",
      });
      handleClose();
    }
  };

  const handleEditCenter = (index) => {
    setEditIndex(index);
    setNewCenter(centers[index]);
    handleShow();
  };

  const handleDeleteCenter = async (index) => {
    const center = centers[index];
    try {
      const res = prompt(
        "Are you sure you want to delete this recycling center?"
      );
      if (res === null || res === false) return;
      await deleteCenter(center.id);
      const updatedCenters = centers.filter((center, i) => i !== index);
      setCenters(updatedCenters);
    } catch (err) {
      setError("Failed to delete recycling center. Please try again later.");
      console.error(
        "Failed to delete recycling center. Please try again later."
      );
    }
  };

  useEffect(() => {
    const getCenters = async () => {
      setLoadingCenters(true);
      try {
        const response = await fetchCenters();
        setCenters(response.data);
      } catch (err) {
        setError("Failed to fetch recycling centers. Please try again later.");
        console.error(
          "Failed to fetch recycling centers. Please try again later."
        );
      } finally {
        setLoadingCenters(false);
      }
    };
    getCenters();
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setError(null);
    }, 3000);
    return () => clearTimeout(timeout);
  }, [error]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const pages = Math.ceil(centers.length / itemsPerPage);

  const paginatedCenters = centers.slice(startIndex, endIndex);

  return (
    <div>
      <Button className="float-end m-2 " variant="primary" onClick={handleShow}>
        Add New Center
      </Button>
      <h3 className="text-center">Recycling Center Manager</h3>

      {/* add page limit input select box */}
      <div className="d-flex m-2">
        <select
          className="form-select w-25"
          value={itemsPerPage}
          onChange={(e) => setItemsPerPage(e.target.value)}
        >
          <option value="2">2</option>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
        </select>
      </div>

      {error && (
        <div
          className="alert alert-danger alert-dismissible fade show"
          role="alert"
        >
          {error}
        </div>
      )}
      {loadingCenters ? (
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : (
        <div>
          <Table striped responsive bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>City</th>
                <th>Address</th>
                <th>Website</th>
                <th>Latitude</th>
                <th>Longitude</th>
                <th>Phone</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedCenters.map((center, index) => (
                <tr key={index}>
                  <td>{center.name}</td>
                  <td>{center.city}</td>
                  <td>{center.address}</td>
                  <td>{center.website}</td>
                  <td>{center.latitude}</td>
                  <td>{center.longitude}</td>
                  <td>{center.phone}</td>
                  <td>
                    <Button
                      variant="warning"
                      className="me-2"
                      onClick={() => handleEditCenter(index)}
                    >
                      <FaEdit />
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => handleDeleteCenter(index)}
                    >
                      <FaTrash />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <ul className="pagination justify-content-center">
            {Array.from({ length: pages }, (_, i) => (
              <li
                key={i}
                className={`page-item ${currentPage === i + 1 ? "active" : ""}`}
              >
                <button
                  className="page-link"
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Center</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formCenterName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={newCenter.name}
                onChange={handleChange}
                placeholder="Enter center name"
              />
            </Form.Group>

            <Form.Group controlId="formCenterCity">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                name="city"
                value={newCenter.city}
                onChange={handleChange}
                placeholder="Enter city"
              />
            </Form.Group>
            <Form.Group controlId="formCenterAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                name="address"
                value={newCenter.address}
                onChange={handleChange}
                placeholder="Enter address"
              />
            </Form.Group>
            <Form.Group controlId="formCenterWebsite">
              <Form.Label>Website</Form.Label>
              <Form.Control
                type="text"
                name="website"
                value={newCenter.website}
                onChange={handleChange}
                placeholder="Enter website"
              />
            </Form.Group>
            <Form.Group controlId="formCenterLatitude">
              <Form.Label>Latitude</Form.Label>
              <Form.Control
                type="text"
                name="latitude"
                value={newCenter.latitude}
                onChange={handleChange}
                placeholder="Enter latitude"
              />
            </Form.Group>
            <Form.Group controlId="formCenterLongitude">
              <Form.Label>Longitude</Form.Label>
              <Form.Control
                type="text"
                name="longitude"
                value={newCenter.longitude}
                onChange={handleChange}
                placeholder="Enter longitude"
              />
            </Form.Group>
            <Form.Group controlId="formCenterPhone">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                name="phone"
                value={newCenter.phone}
                onChange={handleChange}
                placeholder="Enter phone number"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddCenter}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CentersPage;
