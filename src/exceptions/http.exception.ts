export class HttpException extends Error {
  constructor(
    public status: number,
    public message: string = 'Something went wrong',
    public errors?: string[]
  ) {
    super(message);
      
    //   end the request
    //   res.status(status).json({
    //     message,
    //     errors,
    //   });
  }
    
    
    
}
