resource "aws_instance" "bastion" {
  ami                         = "ami-0ced6a024bb18ff2e"
  instance_type               = "t2.xlarge"
  subnet_id                   = aws_subnet.public-1.id
  key_name                    = "mykeyec2"
  associate_public_ip_address = true

  vpc_security_group_ids = [
    aws_security_group.bastion_sg.id
  ]

  tags = {
    Name = "bastion-host"
  }
}
resource "aws_instance" "new_server" {
  ami                         = "ami-0ced6a024bb18ff2e"
  instance_type               = "t2.xlarge"
  subnet_id                   = aws_subnet.public-1.id
  key_name                    = "mykeyec2"
  associate_public_ip_address = true

  vpc_security_group_ids = [
    aws_security_group.bastion_sg.id
  ]

  tags = {
    Name = "new_server"
  }
}
/* 

resource "aws_instance" "app_server" {
  ami           = "ami-0ced6a024bb18ff2e"
  instance_type = "t3.medium"
  subnet_id     = aws_subnet.private-1.id
  key_name      = "mykeyec2"

  vpc_security_group_ids = [aws_security_group.app_sg.id]

  tags = { Name = "app-server" }
}
 */