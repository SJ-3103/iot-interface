# IoT-Interface

## Description :- This is a Web Interface for my final year IoT Project.

It is based on FastApi Backend server with a ReactJs Frontend.

First clone this repository locally.

Run the following commands:

1. To start the frontend server:

    ```
    cd app-ui/
    npm install
    npm run dev
    ```

2. To start the backend server:

    First setup the virtual environment:

    ```
    python3 -m venv venv
    ```    
    Then start the terminal in virtual environment mode:

    ```
    source venv/bin/activate
    ``` 
    
    Now install the dependencies:
    ```
    pip install -r requirements.txt
    ```
    
    Then run the below command:
    ```
    uvicorn main:app
    ```

Note: Always run the above command in main directory.

3. To start backend server in debugger mode:

    ```
    uvicorn main:app --reload
    ```
