provider "aws" {
  region = "us-east-1"
}

resource "aws_lambda_function" "example" {
  function_name = "TerraformExample"

  s3_bucket = "nick-tf-example"
  s3_key    = "v1.0.0/terraform-example.zip"

  handler = "index.handler"
  runtime = "nodejs10.x"

  role = "${aws_iam_role.lambda_exec.arn}"
}

resource "aws_iam_role" "lambda_exec" {
  name = "terraform_example_lambda"

  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "lambda.amazonaws.com"
      },
      "Effect": "Allow",
      "Sid": ""
    }
  ]
}
EOF
}

resource "aws_lambda_permission" "apigw_lambda" {
  statement_id  = "AllowExecutionFromAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = "${aws_lambda_function.example.function_name}"
  principal     = "apigateway.amazonaws.com"

  source_arn = "${aws_api_gateway_deployment.example.execution_arn}/*/*"
}

resource "aws_api_gateway_resource" "proxy" {
  rest_api_id = "${aws_api_gateway_rest_api.example.id}"
  parent_id   = "${aws_api_gateway_rest_api.example.root_resource_id}"
  path_part   = "{proxy+}"
}

resource "aws_api_gateway_method" "proxy" {
  rest_api_id   = "${aws_api_gateway_rest_api.example.id}"
  resource_id   = "${aws_api_gateway_resource.proxy.id}"
  http_method   = "ANY"
  authorization = "NONE"
}

resource "aws_api_gateway_integration" "lambda" {
  rest_api_id = "${aws_api_gateway_rest_api.example.id}"
  resource_id = "${aws_api_gateway_method.proxy.resource_id}"
  http_method = "${aws_api_gateway_method.proxy.http_method}"

  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = "${aws_lambda_function.example.invoke_arn}"
}

resource "aws_api_gateway_method" "proxy_root" {
  rest_api_id   = "${aws_api_gateway_rest_api.example.id}"
  resource_id   = "${aws_api_gateway_rest_api.example.root_resource_id}"
  http_method   = "ANY"
  authorization = "NONE"
}

resource "aws_api_gateway_integration" "lambda_root" {
  rest_api_id = "${aws_api_gateway_rest_api.example.id}"
  resource_id = "${aws_api_gateway_method.proxy_root.resource_id}"
  http_method = "${aws_api_gateway_method.proxy_root.http_method}"

  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = "${aws_lambda_function.example.invoke_arn}"
}
