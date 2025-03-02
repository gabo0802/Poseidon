# Poseidon

## Overview

Poseidon is an innovative application designed to predict flash floods in Florida using advanced machine learning techniques. By analyzing historical flood data and real-time weather conditions, Poseidon provides accurate and timely flood predictions to help communities prepare and respond effectively. Developed with a robust backend in Python and a user-friendly frontend in React, Poseidon aims to mitigate the impact of natural disasters and safeguard lives and property.

## Inspiration

After witnessing the devastating impacts of the 2024 hurricane season—including catastrophic flooding that caused billions of dollars in damages and affected thousands of UF students, as well as millions of Floridians—we were determined to create an application aimed at mitigating the severity of such disasters. Many of our team members have personally seen their families affected by these events, fueling our passion to make a difference. With this shared experience, we knew we could leverage technology to improve preparedness and response for future floods, ultimately helping those who need it most.

## What It Does

Poseidon utilizes a sophisticated machine learning model trained on an extensive dataset, combining historical flood data with real-time weather conditions to predict the likelihood of flash flooding in cities across Florida.

## How We Built It

The backend of the application was developed in Python, utilizing key libraries such as NumPy and scikit-learn. We trained our machine learning model on a large Kaggle dataset, achieving an impressive accuracy rate of 92%. This model processes both historical flood data and real-time weather conditions to deliver accurate flash flood predictions.

For the frontend, we leveraged React, JavaScript, and Tailwind CSS to create a responsive and user-friendly interface. Several npm packages and UI libraries—such as React Simple Maps, React Tooltip, and DaisyUI—were incorporated to enhance functionality and aesthetics.

To seamlessly connect the frontend and backend, we employed FastAPI, which enabled efficient and smooth communication between the two, ensuring a responsive user experience.

## Challenges We Ran Into

- **Collecting Datasets for the ML Model**: While we had access to dozens of datasets that could potentially fit our needs, many were not structured properly for our model. We ultimately leveraged a dataset structured correctly for a similar—but not identical—region, Indonesia. Despite this, we still achieved a 92% accuracy rate on our testing dataset!
- **React & Python Integration**: Initially, we attempted to connect React and Python using Flask with proxy servers for development. However, when integrating it with our model, we encountered significant issues. As a result, we pivoted to FastAPI, which provided a smoother backend experience and a more streamlined deployment process.
- **Tailwind and DaisyUI Integration**: We chose Tailwind for styling due to its simplicity, particularly for a single-page application. While we faced initial setup challenges, this decision significantly front-loaded our design efforts, allowing us to focus on the technical aspects of the project for the majority of the hackathon.
- **react-simple-maps Compatibility Issues**: While react-simple-maps was an excellent choice for rendering Florida’s map, it was not fully up-to-date with the latest version of React. This led to some compatibility issues when integrating it with other packages.

## Accomplishments That We're Proud Of

Not only did we successfully build the Minimum Viable Product (MVP) we initially planned, but we also implemented dozens of additional features beyond our original scope. This exceeded our expectations and significantly improved the application’s capabilities.

## What We Learned

- How to collect, clean, and adapt large datasets for machine learning.
- How to train and deploy an ML model using scikit-learn, Pandas, NumPy, and other Python libraries.
- How to integrate React with both legacy and modern libraries such as react-simple-maps, Tailwind, and DaisyUI.
- The differences between Flask and FastAPI and how to implement API connections efficiently.
- The importance of scoping our project effectively, allowing us to deliver a realistic and polished final product within the hackathon timeframe.

## What's Next for Poseidon

The next step for Poseidon is to expand the application to a national level, enabling its use in flood-prone regions beyond Florida. Achieving this will require retraining the machine learning model on a broader dataset that accounts for diverse weather conditions, landforms, and regional factors across the United States.

Additionally, we plan to enhance the frontend to efficiently process and display this expanded data. This will ensure that the application maintains optimal performance and provides a seamless user experience, even as it scales to accommodate more complex datasets and a larger audience.

## Screenshots:

![Poseidon Landing Page](/front-end/public/Landing_Page.png)
_The landing page of Poseidon, showcasing the user-friendly interface._

![Poseidon Map Selection](/front-end/public/PickFromMap.png)
_Users can select specific areas on the map to get detailed flood predictions._

![Poseidon Gainesville Prediction](/front-end/public/Gainesville.png)
_Flood prediction details for a particular city, demonstrating the application's accuracy and detail._

## Running Instructions

1. Generate a virtual environment named `venv`:

   ```sh
   python -m venv venv
   ```

2. Activate the virtual environment:

   ```sh
   source venv/bin/activate
   ```

3. Install the required packages:

   ```sh
   pip install -r train_requirements.txt
   ```

4. Run the backend from the root directory:

   ```sh
   gunicorn -k uvicorn.workers.UvicornWorker call_model:app --bind 0.0.0.0:8000
   ```

5. For the frontend, navigate to the `front-end` directory:

   ```sh
   cd front-end
   ```

6. Install the npm packages:

   ```sh
   npm install
   ```

7. Run the development server:
   ```sh
   npm run dev
   ```

## Resources

- [Climate and Flood Jakarta Dataset](https://www.kaggle.com/datasets/christopherrichardc/climate-and-flood-jakarta/discussion?sort=hotness)
- [Tailwind CSS](https://tailwindcss.com/)
- [React](https://react.dev/)
- [scikit-learn](https://scikit-learn.org/stable/)
- [Python](https://www.python.org/)
- [Figma Design](https://www.figma.com/design/alqQX36aUTKGyURVQy2Tlk/WebAppUI?node-id=2-3&m=dev)
- [FastAPI](https://fastapi.tiangolo.com/#typer-the-fastapi-of-clis)
