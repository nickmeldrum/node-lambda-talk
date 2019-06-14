resource "aws_api_gateway_rest_api" "example" {
  name        = "TerraformExample"
  description = "Terraform Serverless Application Example"
}

resource "aws_api_gateway_deployment" "example" {
  depends_on = [
    "aws_api_gateway_integration.lambda",
    "aws_api_gateway_integration.lambda_root",
  ]

  rest_api_id = "${aws_api_gateway_rest_api.example.id}"
  stage_name  = "prod"
}

output "url" {
  value = "${aws_api_gateway_deployment.example.invoke_url}"
}
