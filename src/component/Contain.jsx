import { useCallback, useEffect, useState } from 'react'
import React from 'react'
import axios from 'axios'
import styled from 'styled-components'
import ConfirmationModal from '../Form/Confirm'
import { useNavigate } from 'react-router-dom'
import { Spin } from 'antd'
import EditGoal from '../Form/formEdit'
import contrastColorTextScore from '../utils/color'
import StickySuccessAlert from '../utils/alert'

function Contain() {
  const [TOKEN, setTOKEN] = useState(localStorage.getItem('token'))
  const TGLCODE = localStorage.getItem('tglCode')
  const [data, setData] = useState(null)
  const [dataForEdit, setDataForEdit] = useState(null)
  const [idGoal, setIdGoal] = useState(null)
  const [item, setItem] = useState(null)
  const [isShow, setIsShow] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [isRefetch, setIsRefetch] = useState(false)

  const today = new Date().toISOString().split('T')[0]

  const navigate = useNavigate()

  useEffect(() => {
    const fetchOperationGoals = async () => {
      try {
        const response = await axios.post(
          'https://tms-stag.tgl-cloud.com/graphql/',
          {
            query: `
              query {
                allOperationGoal () {
                  items {
                    goalId
                    goalName
                    description
                    colorIndex
                    targetTimeFrom
                    targetTimeTo
                    createdBy
                  }
                  totalCount
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
        setData(response.data.data.allOperationGoal.items)
      } catch (error) {
        console.error(error)
        navigate('/')
      }
    }

    if (TOKEN) {
      fetchOperationGoals()
    }
  }, [TOKEN, isRefetch])

  const [formData, setFormData] = useState({
    goalName: '',
    colorIndex: '',
    description: '',
    targetTimeFrom: '',
    targetTimeTo: ''
  })

  const [errors, setErrors] = useState({
    goalName: '',
    colorIndex: '',
    targetTimeFrom: '',
    targetTimeTo: ''
  })

  const handleChange = useCallback(
    (event) => {
      setFormData({ ...formData, [event.target.name]: event.target.value })
      setErrors('')
    },
    [formData]
  )

  const validateForm = useCallback(() => {
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
  }, [formData])

  const handleSubmited = useCallback(async () => {
    try {
      await axios.post(
        'https://tms-stag.tgl-cloud.com/graphql/',
        {
          query: `
            mutation{
              createOperationGoal(input: {
                colorIndex: "${formData.colorIndex}"
                goalName:"${formData.goalName}"
                description: "${formData.description}"
                targetTimeFrom: "${formData.targetTimeFrom}"
                targetTimeTo: "${formData.targetTimeTo}"
                tglCode: "${TGLCODE}"
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
      setIsRefetch(!isRefetch)
    } catch (error) {
      alert('Thất Bại')
      console.error(error)
    }
  }, [
    formData.colorIndex,
    formData.goalName,
    formData.description,
    formData.targetTimeFrom,
    formData.targetTimeTo,
    isRefetch,
    TOKEN
  ])

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault()
      const errors = validateForm()
      setErrors(errors)
      if (Object.keys(errors).length === 0) {
        handleSubmited()
      }
    },
    [validateForm, handleSubmited]
  )

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <div className='form-container'>
          <div className='form-container-col1'>
            <div className='FormItem'>
              <label htmlFor='goalName'>
                Goal name <sup>*</sup>{' '}
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
                Color Index<sup>*</sup>
              </label>
              <div className='FormItem_input'>
                <input
                  type='color'
                  id='colorIndex'
                  name='colorIndex'
                  defaultValue='#00ff00'
                  onChange={handleChange}
                />
                {errors.colorIndex && (
                  <ErrorMessage>{errors.colorIndex}</ErrorMessage>
                )}
              </div>
            </div>

            <div className='FormItem'>
              <label htmlFor='targetTimeFrom'>
                Ngày bắt đầu<sup>*</sup>
              </label>
              <div className='FormItem_input'>
                <input
                  min={today}
                  type='date'
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
                Ngày Kết Thúc<sup>*</sup>
              </label>
              <div className='FormItem_input'>
                <input
                  type='date'
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
          <div className='form-container-col2'>
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
                  Thêm mới
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>

      {data ? (
        <div className='cont'>
          <div className='cont--1'>
            {data.map((item) => (
              <div key={item.goalId}>
                <InfoContainer
                  onClick={() => setItem(item)}
                  style={{
                    background: `${item.colorIndex}cc`,
                    color: `${contrastColorTextScore(item.colorIndex)}`
                  }}
                >
                  <p>Name: {item.goalName}</p>
                </InfoContainer>
              </div>
            ))}
          </div>
          <div className='cont--2'>
            <h2>Detail</h2>
            {item ? (
              <>
                <p>GoalName: {item.goalName}</p>
                <p> ID: {item.goalId}</p>
                {item.description && <p>Description: {item.description}</p>}
                <p>Create by: {item.createdBy}</p>
                <p>From: {item.targetTimeFrom}</p>
                <p>To: {item.targetTimeTo}</p>
                <div>
                  <button
                    className='delete-btn'
                    onClick={() => {
                      setIsShow(true)
                      setIdGoal(item.goalId)
                    }}
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => {
                      setDataForEdit(item)
                      setIsEdit(true)
                    }}
                    className='delete-btn'
                  >
                    Edit
                  </button>
                </div>
              </>
            ) : (
              <Spin />
            )}
          </div>
        </div>
      ) : (
        <Spin />
      )}
      {isShow && (
        <ConfirmationModal
          TOKEN={TOKEN}
          id={idGoal}
          isShow={isShow}
          onClose={() => setIsShow(false)}
          refetch={() => setIsRefetch(!isRefetch)}
        />
      )}
      {isEdit && (
        <EditGoal
          isShow={isEdit}
          data={dataForEdit}
          onClose={() => setIsEdit(false)}
          refetch={() => setIsRefetch(!isRefetch)}
        />
      )}
      <StickySuccessAlert apiStatus={isRefetch} />
    </Container>
  )
}

export default Contain

const Container = styled.div`
  margin: 0;
  border-radius: 20px;
  background: #f6ffed;
  color: #876800;
  font-size: 16px;

  div {
    justify-content: center;
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
  }
  .cont {
    display: flex;
    padding: 40px 10px;

    @media screen and (max-width: 980px) {
      flex-direction: column;
    }
  }
  .cont--1 {
    flex: 2;
    height: fit-content;

    @media screen and (max-width: 660px) {
      font-size: 14px;
    }
  }
  .cont--2 {
    position: relative;
    display: block;
    text-align: left;
    flex: 1;

    background: #d9f7be;
    border-radius: 6px;
    color: #876800;
    padding: 0px 20px;
    min-height: 400px;
    h2 {
      text-align: center;
      border-bottom: 1px #85cdfd dotted;
      padding-bottom: 10px;
    }
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
      border: none;
      &:hover {
        background: antiquewhite;
      }
    }
  }
  form {
    border-bottom: 1px #85cdfd solid;
    padding: 40px 10px;
    .submit_btn {
      width: 100%;
      margin-right: 20px;
      text-align: end;
      display: block;
      button {
        cursor: pointer;
        height: 36px;
      }
    }
  }
  .form-container {
    display: flex;

    @media screen and (max-width: 660px) {
      flex-direction: column;
    }

    label {
      width: 20%;

      @media screen and (max-width: 980px) {
        font-size: 14px;
        width: 30%;
      }
      @media screen and (max-width: 660px) {
        width: 25%;
      }
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
    label {
      text-align: end;
    }
  }
  .FormItem_input {
    width: 70%;

    @media screen and (max-width: 980px) {
      font-size: 14px;
      width: 60%;
    }
    input {
      width: 100%;
      height: 30px;
      padding-left: 10px;
    }
  }
`

const InfoContainer = styled.div`
  flex: 2;
  text-align: center;
  align-items: center;
  position: relative;
  width: 200px;
  height: 80px;

  padding: 0px 10px;

  background: #fafafa;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
  border: 1px #002329 solid;
  border-radius: 6px;

  animation-name: item-appear;
  animation-duration: 1s;
  animation-timing-function: ease-out;
  animation-fill-mode: forwards;

  @keyframes item-appear {
    from {
      opacity: 0;
      transform: translateY(100px) rotateX(150deg);
    }
    to {
      opacity: 1;
      transform: translateY(0) rotateX(0deg);
    }
  }

  @media screen and (max-width: 660px) {
    width: 160px;
  }
  div {
    display: block;
    width: 100%;

    p {
      margin: 0px !important;
      margin-bottom: 0px !important;
    }
  }
  button {
    cursor: pointer;
    border: none;
    border-radius: 6px;
    width: 60px;
    height: 30px;
    background: burlywood;
    position: absolute;
    bottom: 10px;
    &:hover {
      background: antiquewhite;
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
