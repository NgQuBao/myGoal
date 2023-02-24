import { useState } from 'react'
import React from 'react'
import axios from 'axios'
import styled from 'styled-components'

function EditGoal({ isShow, data, onClose, refetch }) {
  const [TOKEN, setTOKEN] = useState(localStorage.getItem('token'))

  const [formData, setFormData] = useState({
    goalName: data.goalName,
    colorIndex: data.colorIndex,
    description: data.description,
    targetTimeFrom: data.targetTimeFrom,
    targetTimeTo: data.targetTimeTo,
    tglCode: '0000'
  })

  const [errors, setErrors] = useState({
    goalName: '',
    colorIndex: '',
    targetTimeFrom: '',
    targetTimeTo: ''
  })

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value })
    setErrors('')
  }
  const validateForm = () => {
    const newErrors = {}
    if (!formData.goalName) {
      newErrors.goalName = 'bạn chưa nhập'
    }
    if (!formData.colorIndex) {
      newErrors.colorIndex = 'bạn chưa nhập'
    }
    if (!formData.targetTimeFrom) {
      newErrors.targetTimeFrom = 'bạn chưa nhập'
    }
    if (!formData.targetTimeTo) {
      newErrors.targetTimeTo = 'bạn chưa nhập'
    }
    return newErrors
  }
  const handleSubmited = async () => {
    try {
      await axios
        .post(
          'https://tms-stag.tgl-cloud.com/graphql/',
          {
            query: `
            mutation {
              updateOperationGoal(input: {
                idOperationGoal: ${data.goalId}
                colorIndex: "${formData.colorIndex}"
    goalName: "${formData.goalName}"
    description: "${formData.description}"
    targetTimeFrom: "${formData.targetTimeFrom}"
    targetTimeTo: "${formData.targetTimeTo}"
    tglCode: "0000"
              }) {
              goalName
              }
              }
        `
          },
          {
            headers: {
              Authorization: `Bearer ${TOKEN}`
            }
          }
        )
        .then((response) => {
          onClose()
          refetch()
        })
    } catch (error) {
      alert('Thất Bại')
      console.error(error)
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const errors = validateForm()
    setErrors(errors)
    if (Object.keys(errors).length === 0) {
      handleSubmited()
    }
  }

  return (
    <>
      {isShow && (
        <Container>
          <form onSubmit={handleSubmit}>
            <div className='form-container'>
              <div className='form-container-col1'>
                <div className='FormItem'>
                  <label htmlFor='goalName'>
                    Goal name <sup>(*)</sup>{' '}
                  </label>
                  <div className='FormItem_input'>
                    <input
                      type='text'
                      id='goalName'
                      name='goalName'
                      value={formData.goalName}
                      onChange={handleChange}
                    />
                    {errors.goalName && (
                      <ErrorMessage>{errors.goalName}</ErrorMessage>
                    )}
                  </div>
                </div>

                <div className='FormItem'>
                  <label htmlFor='colorIndex'>
                    Color Index<sup>(*)</sup>
                  </label>
                  <div className='FormItem_input'>
                    <input
                      type='string'
                      id='colorIndex'
                      name='colorIndex'
                      value={formData.colorIndex}
                      onChange={handleChange}
                    />
                    {errors.colorIndex && (
                      <ErrorMessage>{errors.colorIndex}</ErrorMessage>
                    )}
                  </div>
                </div>

                <div className='FormItem'>
                  <label htmlFor='targetTimeFrom'>
                    Ngày bắt đầu<sup>(*)</sup>
                  </label>
                  <div className='FormItem_input'>
                    <input
                      type='string'
                      id='targetTimeFrom'
                      name='targetTimeFrom'
                      value={formData.targetTimeFrom}
                      onChange={handleChange}
                    />
                    {errors.targetTimeFrom && (
                      <ErrorMessage>{errors.targetTimeFrom}</ErrorMessage>
                    )}
                  </div>
                </div>
                <div className='FormItem'>
                  <label htmlFor='targetTimeTo'>
                    Ngày Kết Thúc<sup>(*)</sup>
                  </label>
                  <div className='FormItem_input'>
                    <input
                      type='string'
                      id='targetTimeTo'
                      name='targetTimeTo'
                      value={formData.targetTimeTo}
                      onChange={handleChange}
                    />
                    {errors.targetTimeTo && (
                      <ErrorMessage>{errors.targetTimeTo}</ErrorMessage>
                    )}
                  </div>
                </div>
              </div>

              <div className='FormItem'>
                <label htmlFor='description'>Mô tả</label>
                <div className='FormItem_input'>
                  <input
                    type='string'
                    id='description'
                    name='description'
                    value={formData.description}
                    onChange={handleChange}
                  />
                </div>
                <div className='submit_btn'>
                  <button type='submit' disabled={false}>
                    Xác Nhận
                  </button>
                  <button type='string' onClick={() => onClose()}>
                    Hủy bỏ
                  </button>
                </div>
              </div>
            </div>
          </form>
        </Container>
      )}
    </>
  )
}

export default EditGoal

const Container = styled.div`
  width: 500px;
  position: fixed;
  top: 18vh;
  left: 50%;
  transform: translateX(-50%);
  background: #3c84ab;
  border-radius: 20px;
  .cont {
    display: flex;
    padding: 40px 10px;
  }
  .cont--1 {
    flex: 2;
    height: fit-content;
  }
  .cont--2 {
    position: relative;
    display: block;
    flex: 1;
    background: #006d75;
    border-radius: 6px;
    color: #defcf9;
    padding: 0px 20px;
    min-height: 400px;

    div {
      display: flex;
      width: 90%;
      gap: 10px;
      bottom: 10px;
      position: absolute;
    }

    .delete-btn {
      cursor: pointer;
      height: 36px;
      border-radius: 4px;
      width: 40%;
    }
  }
  form {
    border-bottom: none;
    padding: 40px 10px;
    .submit_btn {
      width: 100%;
      margin-right: 16px;
      text-align: end;
      display: block;
      button {
        width: 80px;
        height: 36px;
        margin-left: 10px;
        border: none;
        cursor: pointer;
        &:hover {
          background: antiquewhite;
        }
      }
    }
  }
  .form-container {
    display: flex;
    label {
      width: 20%;
    }
  }
  .form-container-col1 {
    flex: 1;
  }
  .form-container-col2 {
    align-items: end;
    flex: 1;
  }
  .FormItem {
    width: 100%;
    display: flex;
    text-align: center;
    align-items: center;
  }
  .FormItem_input {
    width: 70%;
    input {
      width: 100%;
      height: 30px;
      padding-left: 10px;
    }
  }
`

const ErrorMessage = styled.div`
  color: #ff0000;
  margin-top: 5px;
  padding-left: 10px;
  position: absolute;
  font-style: italic;
`
