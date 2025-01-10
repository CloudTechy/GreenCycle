import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";
import {
  fetchFacts,
  deleteFact,
  createFact,
  updateFact,
} from "../services/api";
import { FaEdit, FaTrash } from "react-icons/fa";

const FactsPage = () => {
  const [facts, setFacts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);
  const [loadingFacts, setLoadingFacts] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [newFact, setNewFact] = useState({
    fact: "",
  });

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewFact({ ...newFact, [name]: value });
  };

  const handleAddFact = async () => {
    if (editIndex !== null) {
      const updatedFacts = facts.map((fact, index) =>
        index === editIndex ? newFact : fact
      );
      try {
        await updateFact(facts[editIndex].id, newFact);
        setFacts(updatedFacts);
        setEditIndex(null);
        setNewFact({
          fact: "",
        });
        handleClose();
      } catch (err) {
        setError("Failed to update recycling Fact. Please try again later.");
        console.error(
          "Failed to update recycling Fact. Please try again later."
        );
      }
    } else {
      try {
        await createFact(newFact);
        setFacts([...facts, newFact]);
      } catch (err) {
        setError("Failed to add recycling Fact. Please try again later.");
        console.error("Failed to add recycling Fact. Please try again later.");
      }
      setNewFact({
        fact: "",
      });
      handleClose();
    }
  };

  const handleEditFact = (index) => {
    setEditIndex(index);
    setNewFact(facts[index]);
    handleShow();
  };

  const handleDeleteFact = async (index) => {
    const fact = facts[index];
    try {
      const res = prompt(
        "Are you sure you want to delete this recycling Fact?"
      );
      if (res === null || res === false) return;
      await deleteFact(fact.id);
      const updatedFacts = facts.filter((fact, i) => i !== index);
      setFacts(updatedFacts);
    } catch (err) {
      setError("Failed to delete Fact. Please try again later.");
      console.error("Failed to delete Fact. Please try again later.");
    }
  };
  useEffect(() => {
    const getFacts = async () => {
      setLoadingFacts(true);
      try {
        const response = await fetchFacts();
        setFacts(response.data);
      } catch (err) {
        setError("Failed to fetch recycling Facts. Please try again later.");
        console.error(
          "Failed to fetch recycling Facts. Please try again later."
        );
      } finally {
        setLoadingFacts(false);
      }
    };
    getFacts();
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setError(null);
    }, 3000);
    return () => clearTimeout(timeout);
  }, [error]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const pages = Math.ceil(facts.length / itemsPerPage);

  const paginatedFacts = facts.slice(startIndex, endIndex);

  return (
    <div>
      <Button className="float-end m-2 " variant="primary" onClick={handleShow}>
        Add New Fact
      </Button>
      <h3 className="text-Fact">Recycling Facts Manager</h3>

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
      {loadingFacts ? (
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : (
        <div>
          <Table striped responsive bordered hover>
            <thead>
              <tr>
                <th>id</th>
                <th>Fact</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedFacts.map((fact, index) => (
                <tr key={index}>
                  <td>{fact.id}</td>
                  <td>{fact.fact}</td>
                  <td>
                    <Button
                      variant="warning"
                      className="me-2"
                      onClick={() => handleEditFact(index)}
                    >
                      <FaEdit />
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => handleDeleteFact(index)}
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
          <Modal.Title>Add New Fact</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="forFactName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="fact"
                value={newFact.fact}
                onChange={handleChange}
                placeholder="Enter fact"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddFact}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
export default FactsPage;
