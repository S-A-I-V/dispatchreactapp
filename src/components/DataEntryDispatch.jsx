import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './DataEntryDispatch.css';

const DataEntry = () => {
  const [formData, setFormData] = useState({
    skuId: '',
    stationId: process.env.REACT_APP_STATION_ID || '', 
    nexsId: process.env.REACT_APP_NEXS_ID || '00000001', 
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [isDisabled, setIsDisabled] = useState(false);

  const skuInputRef = useRef(null);

  useEffect(() => {
    if (skuInputRef.current) {
      skuInputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (formData.skuId.length === 20) {
      handleScan();
    }
  }, [formData.skuId]);

  const formatDate = (date) => {
    let d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    let year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  };

  const formatTimestamp = (date) => {
    let d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    let year = d.getFullYear();
    let hours = '' + d.getHours();
    let minutes = '' + d.getMinutes();
    let seconds = '' + d.getSeconds();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    if (hours.length < 2) hours = '0' + hours;
    if (minutes.length < 2) minutes = '0' + minutes;
    if (seconds.length < 2) seconds = '0' + seconds;

    return [year, month, day].join('-') + ' ' + [hours, minutes, seconds].join(':');
  };

  const handleScan = async () => {
    if (formData.skuId.length === 20) {
      if (formData.stationId === '' || formData.nexsId === '00000001') {
        setError('Station ID or NEXS ID cannot be default values.');
        setIsSubmitting(false);
        return; // Prevent further execution
      }
      
      setIsSubmitting(true);
      setError(null);
      setSuccessMessage('');
      setIsDisabled(true); // Disable input during processing

      const timestamp = formatTimestamp(new Date());
      const dateOfScan = formatDate(new Date());

      const updatedFormData = {
        ...formData,
        dateOfScan,
        timestamp,
      };

      try {
        // Check for redundancy
        const { data } = await axios.get('http://localhost:5000/api/check-duplicate', {
          params: { skuId: formData.skuId }
        });

        if (data.isDuplicate) {
          alert('You are scanning a duplicate entry, hand over to shipping incharge');
        }

        await axios.post('http://localhost:5000/api/data-entry', updatedFormData);
        setSuccessMessage('Data submitted successfully');
        setFormData({
          skuId: '',
          stationId: formData.stationId,
          nexsId: formData.nexsId,
        });
      } catch (error) {
        setError('There was an error submitting the data. Please try again.');
      } finally {
        setTimeout(() => {
          setIsDisabled(false); // Re-enable input after 10 seconds
          setFormData((prevState) => ({
            ...prevState,
            skuId: '', // Clear the SKU ID field
          }));
          // Use a callback to ensure focus happens after state updates
          setTimeout(() => {
            if (skuInputRef.current) {
              skuInputRef.current.focus(); // Focus on the SKU ID input
            }
          }, 0);
        }, 10000);
        setIsSubmitting(false);
      }
    } else {
      setError('SKU ID must be exactly 20 characters.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: name === 'nexsId' ? value.toUpperCase() : value, // Convert nexsId to uppercase
    }));
  };

  return (
    <div className="data-entry">
      <h2>Data Entry</h2>
      <form>
        <div className="form-group">
          <label htmlFor="skuId">Scan SKU ID</label>
          <input
            type="text"
            id="skuId"
            name="skuId"
            value={formData.skuId}
            onChange={handleChange}
            placeholder="Scan SKU ID"
            required
            autoFocus
            ref={skuInputRef}
            maxLength="20"
            disabled={isDisabled} // Disable input if isDisabled is true
          />
        </div>
        <div className="form-group">
          <label htmlFor="stationId">Station ID</label>
          <select
            id="stationId"
            name="stationId"
            value={formData.stationId}
            onChange={handleChange}
            required
            disabled={isDisabled} // Disable input if isDisabled is true
          >
            <option value="" disabled>Select Station ID</option>
            {[...Array(20).keys()].map(i => (
              <option key={`P${String(i + 1).padStart(3, '0')}`} value={`P${String(i + 1).padStart(3, '0')}`}>
                P{String(i + 1).padStart(3, '0')}
              </option>
            ))}
            {[...Array(10).keys()].map(i => (
              <option key={`F${String(i + 1).padStart(3, '0')}`} value={`F${String(i + 1).padStart(3, '0')}`}>
                F{String(i + 1).padStart(3, '0')}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="nexsId">NEXS ID</label>
          <input
            type="text"
            id="nexsId"
            name="nexsId"
            value={formData.nexsId}
            onChange={handleChange}
            placeholder="NEXS ID"
            disabled={isDisabled} // Disable input if isDisabled is true
          />
        </div>
      </form>
      {error && <p className="error">{error}</p>}
      {successMessage && <p className="success">{successMessage}</p>}
    </div>
  );
};

export default DataEntry;